import Footer from '@/components/Footer';
import { userRegisterUsingPOST } from '@/services/smart_bi/userController';
import { LoginForm, ProFormText } from '@ant-design/pro-form';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import {Helmet, Link} from "@@/exports";
import Settings from "../../../../config/defaultSettings";
import {useEmotionCss} from "@ant-design/use-emotion-css";

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });
  // 表单提交
  const handleSubmit = async (values: API.UserRegisterRequest) => {
    const { userPassword, checkPassword } = values;
    // 校验
    if (userPassword !== checkPassword) {
      message.error('两次输入的密码不一致');
      return;
    }

    try {
      // 注册
      const id = await userRegisterUsingPOST(values);
      if (id) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);

        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const {} = history.location;
        history.push({
          pathname: '/user/login',
        });
        return;
      }
    } catch (error: any) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Smart BI 注册"
          subTitle={
            <a href={'https://github.com/seedoilz'} target="_blank" rel="noreferrer">
              菜籽油Github
            </a>
          }
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '注册',
              },
            ]}
          />
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                }}
                placeholder="请输入账号"
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                }}
                placeholder="请输入密码"
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于 8',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                }}
                placeholder="请再次输入密码"
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于 8',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Link to="/user/login">已有账号？</Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
