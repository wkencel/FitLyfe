import React from 'react';
import { useForm } from 'react-hook-form';
import { Box } from '@chakra-ui/react';
import {
  Button,
  ButtonGroup,
  FormControl,
  Input,
  FormLabel,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

export function DietForm({clientid}) {
  const history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm();
// create new diet
  const onSubmit = (data) => {
    fetch('/api/adddailydiet/'+ clientid, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
    })
    .then(data=> console.log(data))
    history.goBack();
  };
console.log('client id', clientid)
  return (
    <Box>
    <form
      style={{ display: 'flex', flexDirection: 'column' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormLabel>
        {' '}
        Daily Water Intake (ounces):
        <Input name="daily-water-intake" ref={register({ required: true })} />
      </FormLabel>
      <FormLabel>
        {' '}
        Daily Calorie Intake (grams):
        <Input name="daily-calorie-intake" ref={register({ required: true })} />
      </FormLabel>
      <FormLabel>
        {' '}
        Daily Macro Intake (grams):
        <Input name="daily-macros-intake" ref={register({ required: true })} />
      </FormLabel>

      {errors.exampleRequired && <span>This field is required</span>}
      <Button type="submit" colorScheme="blue">
        Button
      </Button>
    </form>
    </Box>
  );

  // add back button functionality
}

// module.exports = {DietForm};
