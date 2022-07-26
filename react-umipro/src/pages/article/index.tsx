import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Space, Tag } from 'antd';
import { useRef } from 'react';
import request from 'umi-request';

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

type articleItem = {
  id: string;
  author_id: string;
  tab: "share" | "ask" | "good" | "job";
  title: string;
  reply_count: number;
  visit_count: number;
  create_at: string
}

const columns: ProColumns<articleItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    valueType: 'text',
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    disable: true,
    title: '分类',
    dataIndex: 'tab',
    filters: true,
    onFilter: true,
    valueType: 'select',
    align: "center",
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      ask: {
        text: '问答',
        status: 'Error',
      },
      share: {
        text: '分享',
        status: 'Error',
      },
      good: {
        text: '精品',
        status: 'Success',
      },
      job: {
        text: '招聘',
        status: 'Processing',
      },
    },
  },
  {
    title: '访问量',
    dataIndex: 'visit_count',
    align: "center",
    search: false,
    // renderFormItem: (_, { defaultRender }) => {
    //   return defaultRender(_);
    // },
    render: (_, record) => (`${record.reply_count}/${record.visit_count}`),
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'dateTime',
    sorter: (a, b) => {
      return (Date.parse(a.create_at) - Date.parse(b.create_at))
    },
    hideInSearch: true,
    render: (_, record) => (Date.parse(record.create_at)),
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

const menu = (
  <Menu>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<articleItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(params);

        const pp = {
          tab: params.tab === "all" ? "" : params.tab,
          page: params.current,
          limit: params.pageSize
        }
        return request<{
          data: articleItem[];
        }>(' https://cnodejs.org/api/v1/topics', {
          params: pp,
        });
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        total: 50,
        pageSize: 5,
        pageSizeOptions: [5, 10, 25, 50],
        showSizeChanger: true,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>,
        <Dropdown key="menu" overlay={menu}>
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  );
};