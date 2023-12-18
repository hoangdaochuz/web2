import React from 'react';
import PageTitle from '../components/Typography/PageTitle';
import { Input, HelperText, Label, Button } from '@windmill/react-ui';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createAdmin } from '../actions';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    email: yup.string().email().required('Email is required'),
    name: yup.string().min(2).max(50).required('Fullname is required'),
    phoneNumber: yup.string().max(24).required('Phone number is required'),
    password: yup.string().min(8).max(16).required('Password is required'),
    confirmPassword: yup
      .string()
      .min(8)
      .max(16)
      .required('Conform password is required')
      .oneOf([yup.ref('password')], 'Password must match'),
  })
  .required();

function CreateAdmin(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    props.createAdmin({ ...data, confirmPassword: undefined });
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle>Create Admin</PageTitle>
        <div>
          <Link to="/admins">
            <Button>Back</Button>
          </Link>
        </div>
      </div>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label>
            <span>Email</span>
            <Input
              {...register('email')}
              className="mt-1"
              placeholder="Email"
              type="email"
              valid={errors.email === undefined}
            />
            <HelperText valid={false}>{errors.email?.message}</HelperText>
          </Label>

          <Label className="mt-4">
            <span>Fullname</span>
            <Input
              {...register('name')}
              className="mt-1"
              placeholder="Fullname"
              valid={errors.name === undefined}
            />
            <HelperText valid={false}>{errors.name?.message}</HelperText>
          </Label>

          <Label className="mt-4">
            <span>Phone Number</span>
            <Input
              {...register('phoneNumber')}
              className="mt-1"
              placeholder="Phone Number"
              type="number"
              valid={errors.phoneNumber === undefined}
            />
            <HelperText valid={false}>{errors.phoneNumber?.message}</HelperText>
          </Label>

          <Label className="mt-4">
            <span>Password</span>
            <Input
              {...register('password')}
              className="mt-1"
              placeholder="Password"
              type="password"
              valid={errors.password === undefined}
            />
            <HelperText valid={false}>{errors.password?.message}</HelperText>
          </Label>

          <Label className="mt-4">
            <span>Confirm password</span>
            <Input
              {...register('confirmPassword')}
              className="mt-1"
              placeholder="Confirm password"
              type="password"
              valid={errors.password2 === undefined}
            />
            <HelperText valid={false}>
              {errors.confirmPassword?.message}
            </HelperText>
          </Label>

          <div className="flex justify-center">
            <Button className="mt-6" type="submit">
              Create Admin
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default connect(null, { createAdmin })(CreateAdmin);
