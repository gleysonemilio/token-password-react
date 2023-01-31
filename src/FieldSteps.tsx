import React, { useCallback, useEffect, useState } from 'react'
import './Styles.css'

interface Props {
  onSendValue: (value: string) => void
  lengthField?: number
  error?: boolean
  color?: string
}

export const FieldSteps = ({ onSendValue, lengthField = 6, error, color = '' }: Props) => {
  const [fieldArray, setFieldArray] = useState<string[]>([''])

  useEffect(() => {
    const arrayInitDefault = Array.from({ length: lengthField }, () => '')

    setFieldArray(arrayInitDefault)
  }, [lengthField])

  useEffect(() => {
    if (fieldArray[lengthField - 1] !== '') {
      onSendValue(fieldArray.join('') as string)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldArray])

  const handleDocumentByIdFocusInput = (number: number) => {
    return document.getElementById(`text-input-${number}`)?.focus()
  }

  const handleSetFieldArray = useCallback(
    (value: string, index: number) => {
      return setFieldArray(fieldArray.map((row, idx) => (index !== idx ? row : value)))
    },
    [fieldArray]
  )

  const handleSetSingleValue = useCallback(
    (value: string, index: number) => {
      if (!value) {
        return ''
      }

      if (value.length === lengthField) {
        setFieldArray([])
        handleDocumentByIdFocusInput(fieldArray.length - 1)
        return setFieldArray(value.split(''))
      }

      handleSetFieldArray(value, index)
      handleDocumentByIdFocusInput(index + 1)
    },
    [fieldArray, lengthField, handleSetFieldArray]
  )

  const handleRemoveValue = (index: number) => {
    handleDocumentByIdFocusInput(index - 1)
    handleSetFieldArray('', index)

    if (fieldArray[index] !== '') {
      handleDocumentByIdFocusInput(index)
    }
  }

  const handleSetTwoValue = (value: string, index: number) => {
    const nextPosition = index + 1

    handleSetFieldArray(value, nextPosition)
    handleDocumentByIdFocusInput(nextPosition)
  }

  const handleValidationErrorBorderField = useCallback(
    (index: number) => {
      if (error) {
        return `2px solid ${color}`
      }

      if (!error && fieldArray[index] !== '') {
        return `2px solid ${color}`
      }

      return ''
    },
    [error, fieldArray]
  )

  return (
    <div className="container">
      
      {fieldArray &&
        fieldArray.map((_row, index) => (
          <input
            key={index}
            type="text"
            id={`text-input-${index}`}
            style={{
              height: '0',
              padding: '32px 0 28px 0',
              border: handleValidationErrorBorderField(index)
            }}
            name="token-password-react"
            value={fieldArray[index]}
            maxLength={index > 0 ? 2 : lengthField}
            minLength={index > 0 ? 2 : lengthField}
            autoFocus={index === 0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') {
                return handleDocumentByIdFocusInput(index + 1)
              }
              if (e.key === 'ArrowLeft') {
                return handleDocumentByIdFocusInput(index - 1)
              }
              if (e.key === 'Backspace') {
                return handleRemoveValue(index)
              }
            }}
            onChange={(e) => {
              const value = e.target.value

              if (value.length === 2) {
                return handleSetTwoValue(value.split('')[1], index)
              }
              handleSetSingleValue(value, index)
            }}
            pattern="[false0-9]*"
            inputMode="numeric"
            // error={error || undefined}
          />
        ))}
    </div>
  )
}


