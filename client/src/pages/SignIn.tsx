import React from 'react';
import { Link } from 'react-router-dom';

import SignInForm from '@/components/form/SignInForm';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Typography from '@/components/ui/Typography';

const Login: React.FC = () => {
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center gap-2'>
      <Typography component='h1' variant='title-2' className='text-[2rem] text-primary'>
        sign in
      </Typography>
      <Card className='flex w-[350px] flex-col gap-2'>
        <SignInForm />
        <div className='flex gap-2'>
          <Link to='/' className='w-full'>
            <Button variant='highlight' className='w-full'>
              back
            </Button>
          </Link>
          <Link to='/signUp' className='w-full'>
            <Button variant='highlight' className='w-full'>
              go to sign up
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
