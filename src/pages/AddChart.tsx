import { generateChartByAIUsingPOST } from '@/services/smart_bi/chartController';
import { UploadOutlined } from '@ant-design/icons';
import {Button, Card, Col, Divider, Form, message, Row, Select, Space, Spin, Upload} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import ReactECharts from 'echarts-for-react';
import React, { useState } from 'react';

const AddChart: React.FC = () => {
  const [chart, setChart] = useState<API.AiResponse>();
  const [option, setOption] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    if (loading){
      return
    }

    // console.log('Received values of form: ', values);
    const params = {
      ...values,
      file: undefined,
    };
    try {
      const res = await generateChartByAIUsingPOST(params, {}, values.file.file.originFileObj);
      console.log(res);
      if (!res?.data) {
        message.error('分析失败');
      } else {
        message.success('分析成功');
        const parseSuccess = JSON.parse(res.data.genChart ?? '');
        if (!parseSuccess) {
          throw new Error("解析错误");
        }
        else{
          setChart(res.data);
          setOption(JSON.parse(res.data.genChart ?? ''))
        }
      }
    } catch (e: any) {
      message.error('分析失败', e.message);
    }
    setLoading(false);
  };

  return (
    <div className="add-chart">
      <Row gutter={24}>
        <Col span={12}>
          <Card title={"智能测试"}>
            <Form name="addChart" onFinish={onFinish} initialValues={{}}>
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

            {/*<Form.Item label="Dragger">*/}
            {/*  <Form.Item name="dragger" valuePropName="fileList" noStyle>*/}
            {/*    <Upload.Dragger name="files" action="/upload.do">*/}
            {/*      <p className="ant-upload-drag-icon">*/}
            {/*        <InboxOutlined />*/}
            {/*      </p>*/}
            {/*      <p className="ant-upload-text">Click or drag file to this area to upload</p>*/}
            {/*      <p className="ant-upload-hint">Support for a single or bulk upload.</p>*/}
            {/*    </Upload.Dragger>*/}
            {/*  </Form.Item>*/}
            {/*</Form.Item>*/}

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
        </Col>
        <Col span={12}>
          <Card title="分析结论">
            {chart?.genResult ?? <div>请先在左侧进行提交</div>}
            <Spin spinning={loading}/>
          </Card>
          <Divider />
          <Card title="可视化图表">
            {
              option ? <ReactECharts option={option} /> : <div>请先在左侧进行提交</div>
            }
            <Spin spinning={loading}/>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default AddChart;
