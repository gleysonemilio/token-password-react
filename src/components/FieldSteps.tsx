import React, { HTMLInputTypeAttribute, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

interface Props {
  onSendValue: (value: string) => void
  lengthField?: number
  error?: boolean
  type?: HTMLInputTypeAttribute
  color?: string
}

export const TextInput = styled.input`
  height: 0;
  width: 100%;
  padding: 32px 0 28px 0;

  font-size: 1.8rem;
  letter-spacing: -1px;
  line-height: 40px;
  font-weight: 300;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const ContainerInput = styled.div`
  display: flex;
  gap: 5px;
  margin: 10px 0px 10px 0px;

  input {
    text-align: center;
    justify-content: center;
    border-radius: 5px;
  }
`

const FieldSteps = ({
  onSendValue,
  lengthField = 6,
  error = false,
  type = 'text',
  color = '#00e967'
}: Props) => {
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
      console.log('erro', error)
      if (error) {
        return `1px solid #d13131`
      }

      if (!error && fieldArray[index] !== '') {
        return `1px solid ${color}`
      }

      return '1px solid #ddd'
    },
    [error, fieldArray]
  )

  return (
    <Container>
      <ContainerInput>
        {fieldArray &&
          fieldArray.map((_row, index) => (
            <TextInput
              key={index}
              type={type}
              id={`text-input-${index}`}
              style={{
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
            />
          ))}
      </ContainerInput>
    </Container>
  )
}

export default FieldSteps
