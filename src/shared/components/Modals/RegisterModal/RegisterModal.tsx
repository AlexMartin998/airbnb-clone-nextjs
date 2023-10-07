'use client';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useRegisterModal } from '@/store/useRegisterModal';
import { registerFormSchema } from '@/shared/utils';
import { airbnbApi } from '@/shared/lib';
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
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onToggle = useCallback(() => {
    onClose();
  }, [onClose]);

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
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
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
