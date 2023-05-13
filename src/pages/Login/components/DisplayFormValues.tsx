import { Box, Typography } from '@mui/material'

type Props = {
    isDirty: boolean,
    isValid: boolean,
    values: {
        username: string,
        password: string,
    },
}

export default function DisplayFormValues({ isDirty, isValid, values }: Props) {

  return (
    <Box color="grey.600" mt="10px">
        {isDirty && isValid && (
          <>
            <Typography>Username: {values.username}</Typography>
            <Typography>Password: {values.password}</Typography>
          </>
        )}
      </Box>
  )
}