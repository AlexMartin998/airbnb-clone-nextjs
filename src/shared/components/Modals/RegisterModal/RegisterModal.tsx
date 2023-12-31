'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';

import { airbnbApi } from '@/shared/lib';
import { registerFormSchema } from '@/shared/utils';
import { useLoginModal } from '@/store/useLoginModal';
import { useRegisterModal } from '@/store/useRegisterModal';
import { Modal } from '..';
import { Button, Heading, Input } from '../..';

export type RegisterModalProps = {};

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterModal: React.FC<RegisterModalProps> = () => {
  const isOpen = useRegisterModal(s => s.isOpen);
  const onClose = useRegisterModal(s => s.onClose);
  const onOpenLogin = useLoginModal(s => s.onOpen);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(registerFormSchema),
  });

  const onRegister = async (data: FormData) => {
    setIsLoading(true);

    await airbnbApi
      .post('/auth/register', data)
      .then(() => {
        onClose();
        onOpenLogin();
      })
      .catch(err => {
        toast.error(err?.response.data.error || 'Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onToggle = useCallback(() => {
    onClose();
    onOpenLogin();
  }, [onClose, onOpenLogin]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>
          Already have an account?
          <span
            onClick={onToggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            {' '}
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={onClose}
      onSubmit={handleSubmit(onRegister)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
