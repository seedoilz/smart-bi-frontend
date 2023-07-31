import { generateChartByAIAsyncMqUsingPOST } from '@/services/smart_bi/chartController';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Form, message, Select, Space, Upload } from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';

const AddChartAsync: React.FC = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    if (loading) {
      return;
    }

    // console.log('Received values of form: ', values);
    const params = {
      ...values,
      file: undefined,
    };
    try {
      const res = await generateChartByAIAsyncMqUsingPOST(
        params,
        {},
        values.file.file.originFileObj,
      );
      console.log(res);
      if (!res?.data) {
        message.error('提交失败');
      } else {
        message.success('提交成功，请在历史图表页面进行查看');
        form.resetFields();
      }
    } catch (e: any) {
      message.error('提交失败', e.message);
    }
    setLoading(false);
  };

  return (
    <div className="add-chart">
      <Card title={'智能测试（异步）'}>
        <Form form={form} name="addChart" onFinish={onFinish} initialValues={{}}>
          <Form.Item
            name="goal"
            label="分析需求"
            rules={[{ required: true, message: '选择要分析的需求！' }]}
          >
            <TextArea placeholder={'请输入你的需求:'} />
          </Form.Item>

          <Form.Item name="name" label="图表名称">
            <TextArea placeholder={'请输入图表名称:'} />
          </Form.Item>

          <Form.Item name="chartType" label="图表类型">
            <Select
              placeholder="选择要展示的图表类型！"
              options={[
                { value: '折线图', label: '折线图' },
                { value: '饼状图', label: '饼状图' },
                { value: '柱状图', label: '柱状图' },
                { value: '雷达图', label: '雷达图' },
              ]}
            ></Select>
          </Form.Item>

          <Form.Item name="file" label="CSV数据">
            <Upload name="file" action="/upload.do" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
                Submit
              </Button>
              <Button htmlType="reset">reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default AddChartAsync;
