'use client';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';

import { useRegisterModal } from '@/store/useRegisterModal';
import { registerFormSchema } from '@/shared/utils';
import { airbnbApi } from '@/shared/lib';
import { Modal } from '.';

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
    resolver: valibotResolver(registerFormSchema),
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

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={onClose}
      onSubmit={handleSubmit(onRegister)}
      // body={bodyContent}
      // footer={footerContent}
    />
  );
};

export default RegisterModal;
