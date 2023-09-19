import React, { useCallback } from "react";
import { Form, Input, Button } from "antd";
import { useForm, SubmitHandler, Controller, Resolver } from "react-hook-form";
import { signUpValidation } from "./yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnyObjectSchema } from "yup";
import Link from "next/link";
import styled from "styled-components";
import { LoginType } from "./CommonTypes";
// import { ErrorMessageWrapper } from "./CommonStyle";
interface FormValue {
  userId: string;
  //   nickname: string;
  //   email: string;
  password: string;
  //   password_confirm: string;
}

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;
const FormWrapper = styled(Form)`
  padding: 10px;
`;
const LoginForm: React.FC = ({ setIsLoggedIn }: LoginType) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useCallback(
    () =>
      useForm<FormValue>({
        // resolver: yupResolver<AnyObjectSchema>(signUpValidation),
        mode: "onBlur",
      }),
    []
  )();
  const onSubmitHandler: SubmitHandler<FormValue> = useCallback(
    (data) => {
      setIsLoggedIn(true);
    },
    [handleSubmit]
  );
  return (
    <>
      <FormWrapper onFinish={handleSubmit(onSubmitHandler)}>
        <div>
          <label htmlFor="user-Id">아이디</label>
          <br />
          <Controller
            name="userId"
            control={control}
            render={({ field }) => <Input type="text" {...field} />}
          />
          {/* <ErrorMessageWrapper>
            <p className="text-red-600">{errors.userId?.message}</p>
          </ErrorMessageWrapper> */}
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <br />
          <Controller
            name="password"
            control={control}
            render={({ field }) => {
              return <Input type="password" {...field} />;
            }}
          />

          {/* <ErrorMessageWrapper>
            <p className="text-red-600">{errors.password?.message}</p>
          </ErrorMessageWrapper> */}
        </div>
        <div style={{ marginTop: "10px" }}>
          <ButtonWrapper>
            <Button type="primary" htmlType="submit" loading={false}>
              로그인
            </Button>
          </ButtonWrapper>
          <Link href="/signup">
            <Button>회원가입</Button>
          </Link>
        </div>
      </FormWrapper>
    </>
  );
};

export default LoginForm;