import { useState } from 'react'
import { Button, Card, Col, Form, Input, Row, Space, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useLoad, usePatchRequest, usePostRequest } from '../../hooks/request'
import { categoriesDelete, categoriesPatch, categoriesPost, floorList } from '../../constants/urls'
import useDeleteModal from '../../hooks/useDeleteModal'


function Floor() {

  const [form] = Form.useForm()
  const postRequest = usePostRequest({ url: categoriesPost })
  const patchRequest = usePatchRequest()
  const [isUpdate, setIsUpdate] = useState(null)
  const deleteModal = useDeleteModal()

  const { response: floor, loading, request: reload } = useLoad({ url: floorList })

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },

    {
      title: 'Actions',
      render: (item) => (
        <Space>
          <Button icon={<EditOutlined />} disabled={isUpdate} onClick={() => handleEdit(item)} />
          <Button icon={<DeleteOutlined />} disabled={isUpdate} danger onClick={() => deleteModal(categoriesDelete(item.id), reload)} />
        </Space>
      )
    }
  ]

  const handleEdit = (item) => {
    form.setFieldsValue(item)
    setIsUpdate(item.id)
  }

  const handleFinish = async (data) => {
    const { success } = isUpdate ? await patchRequest.request({ url: categoriesPatch(isUpdate), data }) : await postRequest.request({ data })
    if (success) {
      reload()
      form.resetFields()
      setIsUpdate(null)
    }
  }

  const handleCanel = () => {
    setIsUpdate(null)
    form.resetFields()
  }

  return (
    <>
      <Card title='Floor'>
        <Row gutter={[16, 16]} >
          <Col span={8} style={{ borderRight: '1px solid #f0f0f0' }} >
            <Form onFinish={handleFinish} layout='vertical' form={form} >
              <Form.Item label="Title" name='name' rules={[{ required: true, message: 'Maydon bo\'sh' }]} >
                <Input />
              </Form.Item>
              <Form.Item label="Title" name='name' rules={[{ required: true, message: 'Maydon bo\'sh' }]} >
                <Input />
              </Form.Item>
              <Form.Item label="Title" name='name' rules={[{ required: true, message: 'Maydon bo\'sh' }]} >
                <Input />
              </Form.Item>
              <Form.Item label="Title" name='name' rules={[{ required: true, message: 'Maydon bo\'sh' }]} >
                <Input />
              </Form.Item>
              <Form.Item label="Title" name='name' rules={[{ required: true, message: 'Maydon bo\'sh' }]}>
                <Input />
              </Form.Item>
              <Space>
                <Button type='primary' htmlType='submit' loading={loading} >{isUpdate ? 'Update' : 'Create'} floor</Button>
                {isUpdate ? <Button onClick={handleCanel}>Cancel</Button> : null}
              </Space>
            </Form>
          </Col>

          <Col span={16} >
            <Table dataSource={floor} columns={columns} loading={loading} rowKey='id' ></Table>
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default Floor