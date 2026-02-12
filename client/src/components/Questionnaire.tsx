import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Questionnaire, Question } from '@/types/questionnaire';
import SketchIcon from './SketchIcon';

interface QuestionnaireProps {
  questionnaire: Questionnaire;
  onComplete: (answers: Record<string, any>) => void;
  onCancel?: () => void;
}

export function QuestionnaireComponent({ questionnaire, onComplete, onCancel }: QuestionnaireProps) {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(0);

  const visibleQuestions = questionnaire.questions.filter((q) => {
    if (!q.conditional) return true;
    const dependsOnAnswer = answers[q.conditional.dependsOn];
    return q.conditional.showWhen(dependsOnAnswer);
  });

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    // Clear error for this question
    if (errors[questionId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const validateQuestion = (question: Question, value: any): string | null => {
    if (question.required && (value === undefined || value === null || value === '')) {
      return 'Это поле обязательно для заполнения';
    }

    if (value === undefined || value === null || value === '') {
      return null; // Optional field is empty, no error
    }

    if (question.validation) {
      const { minLength, maxLength, pattern, custom } = question.validation;

      if (minLength && typeof value === 'string' && value.length < minLength) {
        return `Минимальная длина: ${minLength} символов`;
      }

      if (maxLength && typeof value === 'string' && value.length > maxLength) {
        return `Максимальная длина: ${maxLength} символов`;
      }

      if (pattern && typeof value === 'string' && !new RegExp(pattern).test(value)) {
        return 'Неверный формат';
      }

      if (custom) {
        return custom(value);
      }
    }

    return null;
  };

  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    visibleQuestions.forEach((question) => {
      const error = validateQuestion(question, answers[question.id]);
      if (error) {
        newErrors[question.id] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateAll()) {
      onComplete(answers);
    }
  };

  const renderQuestion = (question: Question) => {
    const value = answers[question.id];
    const error = errors[question.id];
    const hasError = !!error;

    switch (question.type) {
      case 'text':
        return (
          <div key={question.id} className="space-y-2">
            <Label htmlFor={question.id} className={question.required ? 'after:content-["*"] after:text-destructive' : ''}>
              {question.label}
            </Label>
            {question.description && (
              <p className="text-sm text-foreground/60">{question.description}</p>
            )}
            <Input
              id={question.id}
              value={value || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              placeholder={question.placeholder}
              className={hasError ? 'border-destructive' : ''}
            />
            {hasError && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {error}
              </p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div key={question.id} className="space-y-2">
            <Label htmlFor={question.id} className={question.required ? 'after:content-["*"] after:text-destructive' : ''}>
              {question.label}
            </Label>
            {question.description && (
              <p className="text-sm text-foreground/60">{question.description}</p>
            )}
            <Textarea
              id={question.id}
              value={value || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              placeholder={question.placeholder}
              className={hasError ? 'border-destructive' : ''}
              rows={4}
            />
            {hasError && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {error}
              </p>
            )}
          </div>
        );

      case 'number':
        return (
          <div key={question.id} className="space-y-2">
            <Label htmlFor={question.id} className={question.required ? 'after:content-["*"] after:text-destructive' : ''}>
              {question.label}
            </Label>
            {question.description && (
              <p className="text-sm text-foreground/60">{question.description}</p>
            )}
            <Input
              id={question.id}
              type="number"
              value={value || ''}
              onChange={(e) => handleAnswerChange(question.id, parseFloat(e.target.value) || 0)}
              placeholder={question.placeholder}
              min={question.min}
              max={question.max}
              step={question.step}
              className={hasError ? 'border-destructive' : ''}
            />
            {hasError && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {error}
              </p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={question.id} className="space-y-2">
            <Label className={question.required ? 'after:content-["*"] after:text-destructive' : ''}>
              {question.label}
            </Label>
            {question.description && (
              <p className="text-sm text-foreground/60">{question.description}</p>
            )}
            <Select value={value?.toString() || ''} onValueChange={(val) => handleAnswerChange(question.id, val)}>
              <SelectTrigger className={hasError ? 'border-destructive' : ''}>
                <SelectValue placeholder={question.placeholder || 'Выберите...'} />
              </SelectTrigger>
              <SelectContent>
                {question.options?.map((option) => (
                  <SelectItem key={option.value.toString()} value={option.value.toString()}>
                    {option.label}
                    {option.description && (
                      <span className="text-xs text-foreground/60 ml-2">({option.description})</span>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {hasError && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {error}
              </p>
            )}
          </div>
        );

      case 'radio':
        return (
          <div key={question.id} className="space-y-2">
            <Label className={question.required ? 'after:content-["*"] after:text-destructive' : ''}>
              {question.label}
            </Label>
            {question.description && (
              <p className="text-sm text-foreground/60">{question.description}</p>
            )}
            <RadioGroup
              value={value?.toString() || ''}
              onValueChange={(val) => handleAnswerChange(question.id, val)}
            >
              {question.options?.map((option) => (
                <div key={option.value.toString()} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value.toString()} id={`${question.id}-${option.value}`} />
                  <Label htmlFor={`${question.id}-${option.value}`} className="font-normal cursor-pointer">
                    {option.label}
                    {option.description && (
                      <span className="text-xs text-foreground/60 ml-2">({option.description})</span>
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {hasError && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {error}
              </p>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div key={question.id} className="space-y-2">
            <Label className={question.required ? 'after:content-["*"] after:text-destructive' : ''}>
              {question.label}
            </Label>
            {question.description && (
              <p className="text-sm text-foreground/60">{question.description}</p>
            )}
            <div className="space-y-2">
              {question.options?.map((option) => {
                const checked = Array.isArray(value) && value.includes(option.value);
                return (
                  <div key={option.value.toString()} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${question.id}-${option.value}`}
                      checked={checked}
                      onCheckedChange={(checked) => {
                        const currentValue = Array.isArray(value) ? value : [];
                        if (checked) {
                          handleAnswerChange(question.id, [...currentValue, option.value]);
                        } else {
                          handleAnswerChange(question.id, currentValue.filter((v) => v !== option.value));
                        }
                      }}
                    />
                    <Label htmlFor={`${question.id}-${option.value}`} className="font-normal cursor-pointer">
                      {option.label}
                      {option.description && (
                        <span className="text-xs text-foreground/60 ml-2">({option.description})</span>
                      )}
                    </Label>
                  </div>
                );
              })}
            </div>
            {hasError && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {error}
              </p>
            )}
          </div>
        );

      case 'date':
        return (
          <div key={question.id} className="space-y-2">
            <Label htmlFor={question.id} className={question.required ? 'after:content-["*"] after:text-destructive' : ''}>
              {question.label}
            </Label>
            {question.description && (
              <p className="text-sm text-foreground/60">{question.description}</p>
            )}
            <Input
              id={question.id}
              type="date"
              value={value ? new Date(value).toISOString().split('T')[0] : ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              className={hasError ? 'border-destructive' : ''}
            />
            {hasError && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {error}
              </p>
            )}
          </div>
        );

      case 'rating':
        return (
          <div key={question.id} className="space-y-2">
            <Label className={question.required ? 'after:content-["*"] after:text-destructive' : ''}>
              {question.label}
            </Label>
            {question.description && (
              <p className="text-sm text-foreground/60">{question.description}</p>
            )}
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].slice(0, question.max || 10).map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleAnswerChange(question.id, rating)}
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${
                    value === rating
                      ? 'border-primary bg-primary/10 text-primary scale-110'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
            {hasError && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {error}
              </p>
            )}
          </div>
        );

      case 'scale':
        return (
          <div key={question.id} className="space-y-2">
            <Label className={question.required ? 'after:content-["*"] after:text-destructive' : ''}>
              {question.label}
            </Label>
            {question.description && (
              <p className="text-sm text-foreground/60">{question.description}</p>
            )}
            <div className="px-2">
              <Slider
                value={[value || question.min || 0]}
                onValueChange={([val]) => handleAnswerChange(question.id, val)}
                min={question.min || 0}
                max={question.max || 100}
                step={question.step || 1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-foreground/60 mt-1">
                <span>{question.min || 0}</span>
                <span className="font-semibold text-foreground">{value || question.min || 0}</span>
                <span>{question.max || 100}</span>
              </div>
            </div>
            {hasError && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {error}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{questionnaire.title}</h2>
        {questionnaire.description && (
          <p className="text-foreground/60">{questionnaire.description}</p>
        )}
      </div>

      {/* Progress */}
      {visibleQuestions.length > 5 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-foreground/60">
            <span>Прогресс</span>
            <span>
              {Object.keys(answers).length} / {visibleQuestions.length}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${(Object.keys(answers).length / visibleQuestions.length) * 100}%`,
              }}
              className="h-full bg-primary"
            />
          </div>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {visibleQuestions.map((question) => renderQuestion(question))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-border">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Отмена
          </Button>
        )}
        <Button onClick={handleSubmit} className="flex-1 gap-2">
          <CheckCircle2 className="h-4 w-4" />
          {questionnaire.submitButtonText || 'Сохранить'}
        </Button>
      </div>
    </div>
  );
}
