import React from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';

export interface ICreatePost {
  text: string;
}

const CreaterPost: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreatePost>();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name='text'
          optionals={{
            ...register('text', {
              required: 'text is a required field',
              minLength: {
                value: 1,
                message: 'the minimum text length is 1 characters',
              },
            }),
          }}
          error={errors.text ? errors.text.message : undefined}
        >
          text post
        </Input>
        <Button type='submit' variant='activity' className='hover:contrast-125'>
          post
        </Button>
      </form>
    </Card>
  );
};

export default CreaterPost;
