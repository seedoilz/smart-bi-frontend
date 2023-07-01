import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
const Footer: React.FC = () => {
  const defaultMessage = '菜籽油 鱼皮 联合出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Smart BI',
          title: 'Smart BI',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/seedoilz/smart-bi-frontend',
          blankTarget: true,
        },
        {
          key: 'Smart BI',
          title: 'Smart BI',
          href: 'https://github.com/seedoilz/smart-bi-frontend',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
