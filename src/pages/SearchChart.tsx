import { listMyChartByPageUsingPOST } from '@/services/smart_bi/chartController';
import { useModel } from '@@/exports';
import { Avatar, Card, List, message, Select } from 'antd';
import Search from 'antd/es/input/Search';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';

const SearchChart: React.FC = () => {
  const initSearchParams = {
    pageSize: 4,
    sortField: 'createTime',
    sortOrder: 'desc',
    current: 1,
  };

  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({ ...initSearchParams });
  const [chartList, setChartList] = useState<API.Chart[]>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await listMyChartByPageUsingPOST(searchParams);
      if (res.data) {
        setChartList(res.data.records ?? []);
        setTotal(res.data.total ?? 0);
      }
    } catch (e: any) {
      message.error('获取图表历史失败' + e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [searchParams]);

  return (
    <div className="search-chart">
      <div>
        <Search
          placeholder="请输入图表名称"
          enterButton
          style={{ width: '50%', paddingRight: '50px' }}
          loading={loading}
          onSearch={(value) => {
            // 设置搜索条件
            setSearchParams({
              ...searchParams,
              name: value,
            });
          }}
        />
        <Select
          placeholder="选择要搜索的图表类型"
          style={{ width: 200 }}
          loading={loading}
          onChange={(value) => {
            if (value === '全选') {
              setSearchParams({
                ...initSearchParams,
              });
            } else {
              // 设置搜索条件
              setSearchParams({
                ...initSearchParams,
                chartType: value,
              });
            }
          }}
          options={[
            { value: '全选', label: '全选' },
            { value: '折线图', label: '折线图' },
            { value: '饼状图', label: '饼状图' },
            { value: '柱状图', label: '柱状图' },
            { value: '雷达图', label: '雷达图' },
          ]}
        />
      </div>
      <div style={{ marginBottom: 30 }} />
      <List
        grid={{
          gutter: 16,
          xl: 2,
          xxl: 2,
        }}
        itemLayout="horizontal"
        pagination={{
          onChange: (page, pageSize) => {
            setSearchParams({
              ...searchParams,
              current: page,
              pageSize,
            });
          },
          pageSize: initSearchParams.pageSize,
          total: total,
          current: searchParams.current,
        }}
        dataSource={chartList}
        footer={
          <div>
            <b>Smart BI</b> seedoilz
          </div>
        }
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card style={{ width: '100%' }}>
              <List.Item.Meta
                avatar={<Avatar src={currentUser?.userAvatar} />}
                title={item.name}
                description={item.chartType ? '图表类型:' + item.chartType : undefined}
              />
              <div style={{ marginBottom: 16 }} />
              <p>{'分析目标' + item.goal}</p>
              <ReactECharts option={JSON.parse(item.genChart ?? '{}')} />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
export default SearchChart;
