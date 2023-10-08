'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import { loginFormSchema } from '@/shared/utils';
import { useLoginModal } from '@/store/useLoginModal';
import { useRegisterModal } from '@/store/useRegisterModal';
import { Button, Heading, Input, Modal } from '../..';

export type LoginModalProps = {};

type FormData = {
  email: string;
  password: string;
};

const LoginModal: React.FC<LoginModalProps> = () => {
  const isOpen = useLoginModal(s => s.isOpen);
  const onClose = useLoginModal(s => s.onClose);
  const router = useRouter();

  const onOpenRegister = useRegisterModal(s => s.onOpen);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginFormSchema),
  });

  const onLogin = async (data: FormData) => {
    setIsLoading(true);

    // don't need login endpoint 'cause it's handled by NextAuth | only providers configured
    signIn('credentials', { ...data, redirect: false }).then(cb => {
      setIsLoading(false);
      if (cb?.ok) {
        toast.success('Logged in');
        router.refresh();
        onClose();
      }
      if (cb?.error) {
        console.log(cb.error);
        toast.error(
          'There was a problem logging in. Check your email and password or create an account.'
        );
      }
    });
  };

  const onToggle = useCallback(() => {
    onClose();
    onOpenRegister();
  }, [onClose, onOpenRegister]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
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
          First time using Airbnb?
          <span
            onClick={onToggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            {' '}
            Create an account
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={onClose}
      onSubmit={handleSubmit(onLogin)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
