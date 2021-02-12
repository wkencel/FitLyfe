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

function ClientForm() {
  const history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data)
    fetch('/api/newTrainee', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json',
      },
    });
    history.goBack();
  };

  return (
    <Box>
      <form
        className="clientForm"
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="clientForm__nameInput">
          <FormLabel>
            {' '}
            First Name
            <Input name="firstname" ref={register({ required: true })} />
          </FormLabel>
          <FormLabel>
            {' '}
            Last Name
            <Input name="lastname" ref={register({ required: true })} />
          </FormLabel>
        </div>
        <FormLabel>
          {' '}
          Email
          <Input name="email" ref={register({ required: true })} />
        </FormLabel>

        <FormLabel>
        
          Contracts
          <Input name="contracts" ref={register({ required: true })}></Input>
        </FormLabel>

        <FormLabel>
          Age
          <Input name="age" ref={register({ required: true })}></Input>
        </FormLabel>

        <FormLabel>
          Gender
          <Input name="gender" ref={register({ required: true })}></Input>
        </FormLabel>

        <FormLabel>
          Weight
          <Input name="weight_lbs" ref={register({ required: true })}></Input>
        </FormLabel>

        <FormLabel>
          Height
          <Input name="height" ref={register({ required: true })}></Input>
        </FormLabel>

        {errors.exampleRequired && <span>This field is required</span>}
        <Button className="clientForm__btn" type="submit" colorScheme="blue">
          Save
        </Button>
      </form>
    </Box>
  );

  // add back button functionality
}

export default ClientForm;
