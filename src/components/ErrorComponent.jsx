import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const ErrorComponent = ({message}) => {
  return (
    <div>
    <Alert status='error' position={'fixed'} >
      <AlertIcon/>
      {message}
    </Alert>
    </div>
  )
}

export default ErrorComponent
