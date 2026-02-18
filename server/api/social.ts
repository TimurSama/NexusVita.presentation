import { Router } from 'express';
import { supabase } from '../supabase/client';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Get user profile by username
router.get('/users/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const authHeader = req.headers.authorization;
    let currentUserId: string | null = null;

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        currentUserId = decoded.userId;
      } catch {}
    }

    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select(`
        *,
        posts:posts(count),
        followers:follows!following_id(count),
        following:follows!follower_id(count)
      `)
      .eq('username', username)
      .single();

    if (error || !profile) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if current user is following
    let isFollowing = false;
    if (currentUserId) {
      const { data: follow } = await supabase
        .from('follows')
        .select('id')
        .eq('follower_id', currentUserId)
        .eq('following_id', profile.id)
        .single();
      isFollowing = !!follow;
    }

    res.json({
      id: profile.id,
      username: profile.username,
      full_name: profile.full_name,
      avatar_url: profile.avatar_url,
      bio: profile.bio,
      location: profile.location,
      website: profile.website,
      created_at: profile.created_at,
      role: profile.role,
      is_verified: profile.is_verified,
      posts_count: profile.posts?.[0]?.count || 0,
      followers_count: profile.followers?.[0]?.count || 0,
      following_count: profile.following?.[0]?.count || 0,
      is_following: isFollowing,
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user posts
router.get('/users/:username/posts', async (req, res) => {
  try {
    const { username } = req.params;
    const authHeader = req.headers.authorization;
    let currentUserId: string | null = null;

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        currentUserId = decoded.userId;
      } catch {}
    }

    // Get user ID
    const { data: user } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('username', username)
      .single();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        *,
        user:user_profiles!user_id(username, full_name, avatar_url),
        likes:likes(count),
        comments:comments(count)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Check if current user liked/saved posts
    const postsWithStatus = await Promise.all((posts || []).map(async (post: any) => {
      let isLiked = false;
      let isSaved = false;

      if (currentUserId) {
        const [{ data: like }, { data: save }] = await Promise.all([
          supabase.from('likes').select('id').eq('user_id', currentUserId).eq('post_id', post.id).single(),
          supabase.from('saves').select('id').eq('user_id', currentUserId).eq('post_id', post.id).single(),
        ]);
        isLiked = !!like;
        isSaved = !!save;
      }

      return {
        id: post.id,
        user_id: post.user_id,
        content: post.content,
        media_urls: post.media_urls,
        likes_count: post.likes?.[0]?.count || 0,
        comments_count: post.comments?.[0]?.count || 0,
        created_at: post.created_at,
        is_liked: isLiked,
        is_saved: isSaved,
        user: post.user,
      };
    }));

    res.json(postsWithStatus);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get saved posts
router.get('/users/:username/saved', async (req, res) => {
  try {
    const { username } = req.params;
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    // Verify this is the current user's profile
    const { data: user } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('username', username)
      .single();

    if (!user || user.id !== decoded.userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { data: saves, error } = await supabase
      .from('saves')
      .select(`
        post:posts(
          *,
          user:user_profiles!user_id(username, full_name, avatar_url),
          likes:likes(count),
          comments:comments(count)
        )
      `)
      .eq('user_id', decoded.userId)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const posts = (saves || []).map((save: any) => ({
      id: save.post.id,
      user_id: save.post.user_id,
      content: save.post.content,
      media_urls: save.post.media_urls,
      likes_count: save.post.likes?.[0]?.count || 0,
      comments_count: save.post.comments?.[0]?.count || 0,
      created_at: save.post.created_at,
      is_liked: true,
      is_saved: true,
      user: save.post.user,
    }));

    res.json(posts);
  } catch (error) {
    console.error('Get saved error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Follow/unfollow user
router.post('/users/:userId/follow', async (req, res) => {
  try {
    const { userId } = req.params;
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    if (decoded.userId === userId) {
      return res.status(400).json({ error: 'Cannot follow yourself' });
    }

    const { data, error } = await supabase
      .from('follows')
      .insert({ follower_id: decoded.userId, following_id: userId })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Follow error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/users/:userId/follow', async (req, res) => {
  try {
    const { userId } = req.params;
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const { error } = await supabase
      .from('follows')
      .delete()
      .eq('follower_id', decoded.userId)
      .eq('following_id', userId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Unfollow error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get followers
router.get('/users/:userId/followers', async (req, res) => {
  try {
    const { userId } = req.params;

    const { data: follows, error } = await supabase
      .from('follows')
      .select(`
        follower:user_profiles!follower_id(id, username, full_name, avatar_url, is_verified)
      `)
      .eq('following_id', userId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json((follows || []).map((f: any) => f.follower));
  } catch (error) {
    console.error('Get followers error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get following
router.get('/users/:userId/following', async (req, res) => {
  try {
    const { userId } = req.params;

    const { data: follows, error } = await supabase
      .from('follows')
      .select(`
        following:user_profiles!following_id(id, username, full_name, avatar_url, is_verified)
      `)
      .eq('follower_id', userId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json((follows || []).map((f: any) => f.following));
  } catch (error) {
    console.error('Get following error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create post
router.post('/posts', async (req, res) => {
  try {
    const { content, media_urls } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const { data, error } = await supabase
      .from('posts')
      .insert({
        user_id: decoded.userId,
        content,
        media_urls: media_urls || [],
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get post comments
router.get('/posts/:postId/comments', async (req, res) => {
  try {
    const { postId } = req.params;

    const { data: comments, error } = await supabase
      .from('comments')
      .select(`
        *,
        user:user_profiles!user_id(username, full_name, avatar_url)
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(comments || []);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add comment
router.post('/posts/:postId/comments', async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const { data, error } = await supabase
      .from('comments')
      .insert({
        post_id: postId,
        user_id: decoded.userId,
        content,
      })
      .select(`
        *,
        user:user_profiles!user_id(username, full_name, avatar_url)
      `)
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Like/unlike post
router.post('/posts/:postId/like', async (req, res) => {
  try {
    const { postId } = req.params;
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const { data, error } = await supabase
      .from('likes')
      .insert({ user_id: decoded.userId, post_id: postId })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Like error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/posts/:postId/like', async (req, res) => {
  try {
    const { postId } = req.params;
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('user_id', decoded.userId)
      .eq('post_id', postId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Unlike error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Save/unsave post
router.post('/posts/:postId/save', async (req, res) => {
  try {
    const { postId } = req.params;
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const { data, error } = await supabase
      .from('saves')
      .insert({ user_id: decoded.userId, post_id: postId })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/posts/:postId/save', async (req, res) => {
  try {
    const { postId } = req.params;
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const { error } = await supabase
      .from('saves')
      .delete()
      .eq('user_id', decoded.userId)
      .eq('post_id', postId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Unsave error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get feed posts
router.get('/feed', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    // Get posts from users the current user follows
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        *,
        user:user_profiles!user_id(username, full_name, avatar_url),
        likes:likes(count),
        comments:comments(count)
      `)
      .in('user_id', supabase
        .from('follows')
        .select('following_id')
        .eq('follower_id', decoded.userId)
      )
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Add like/save status
    const postsWithStatus = await Promise.all((posts || []).map(async (post: any) => {
      const [{ data: like }, { data: save }] = await Promise.all([
        supabase.from('likes').select('id').eq('user_id', decoded.userId).eq('post_id', post.id).single(),
        supabase.from('saves').select('id').eq('user_id', decoded.userId).eq('post_id', post.id).single(),
      ]);

      return {
        ...post,
        likes_count: post.likes?.[0]?.count || 0,
        comments_count: post.comments?.[0]?.count || 0,
        is_liked: !!like,
        is_saved: !!save,
      };
    }));

    res.json(postsWithStatus);
  } catch (error) {
    console.error('Get feed error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ==================== STORIES ====================

// Create story
router.post('/stories', async (req, res) => {
  try {
    const { media_url, type, text, text_position, text_color } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    // Stories expire after 24 hours
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const { data, error } = await supabase
      .from('stories')
      .insert({
        user_id: decoded.userId,
        media_url,
        type,
        text,
        text_position,
        text_color,
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (error) {
    console.error('Create story error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get stories feed (from followed users)
router.get('/stories/feed', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    let followingIds: string[] = [];
    let currentUserId: string | null = null;

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        currentUserId = decoded.userId;
        
        // Get followed users
        const { data: follows } = await supabase
          .from('follows')
          .select('following_id')
          .eq('follower_id', decoded.userId);
        
        followingIds = follows?.map(f => f.following_id) || [];
      } catch {}
    }

    // Include own stories
    if (currentUserId) {
      followingIds.push(currentUserId);
    }

    const now = new Date().toISOString();

    const { data: stories, error } = await supabase
      .from('stories')
      .select(`
        *,
        user:user_profiles!user_id(username, full_name, avatar_url),
        views:story_views(count)
      `)
      .in('user_id', followingIds)
      .gt('expires_at', now)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Check if current user viewed each story
    const storiesWithViewStatus = await Promise.all((stories || []).map(async (story: any) => {
      let viewed = false;
      if (currentUserId) {
        const { data: view } = await supabase
          .from('story_views')
          .select('id')
          .eq('story_id', story.id)
          .eq('user_id', currentUserId)
          .single();
        viewed = !!view;
      }

      return {
        ...story,
        viewed,
        views_count: story.views?.[0]?.count || 0,
      };
    }));

    res.json({ stories: storiesWithViewStatus });
  } catch (error) {
    console.error('Get stories error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's stories
router.get('/stories', async (req, res) => {
  try {
    const { user_id } = req.query;
    const authHeader = req.headers.authorization;
    
    let currentUserId: string | null = null;

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        currentUserId = decoded.userId;
      } catch {}
    }

    const now = new Date().toISOString();

    let query = supabase
      .from('stories')
      .select(`
        *,
        user:user_profiles!user_id(username, full_name, avatar_url),
        views:story_views(count)
      `)
      .gt('expires_at', now);

    if (user_id) {
      query = query.eq('user_id', user_id);
    }

    const { data: stories, error } = await query.order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Check if current user viewed each story
    const storiesWithViewStatus = await Promise.all((stories || []).map(async (story: any) => {
      let viewed = false;
      if (currentUserId) {
        const { data: view } = await supabase
          .from('story_views')
          .select('id')
          .eq('story_id', story.id)
          .eq('user_id', currentUserId)
          .single();
        viewed = !!view;
      }

      return {
        ...story,
        viewed,
        views_count: story.views?.[0]?.count || 0,
      };
    }));

    res.json({ stories: storiesWithViewStatus });
  } catch (error) {
    console.error('Get user stories error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Mark story as viewed
router.post('/stories/:storyId/view', async (req, res) => {
  try {
    const { storyId } = req.params;
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    const { error } = await supabase
      .from('story_views')
      .insert({
        story_id: storyId,
        user_id: decoded.userId,
      });

    if (error && !error.message.includes('duplicate')) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('View story error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
