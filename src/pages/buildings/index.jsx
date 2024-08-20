import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Input, Row, Space, Switch, Table, Typography } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useLoad, usePatchRequest, usePostRequest } from '../../hooks/request'
import { buildingsDelete, buildingsList, categoriesDelete, categoriesList, categoriesPatch, categoriesPost } from '../../constants/urls'
import { slugify } from '../../utils/helpers'
import useDeleteModal from '../../hooks/useDeleteModal'
import Item from 'antd/es/list/Item';


function Buildings() {

  const [form] = Form.useForm()
  const title = Form.useWatch('title', form)
  const postRequest = usePostRequest({ url: categoriesPost })
  const patchRequest = usePatchRequest()
  const [isUpdate, setIsUpdate] = useState(null)
  const deleteModal = useDeleteModal()

  const { response: buildings, loading, request: reload } = useLoad({ url: buildingsList })




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
          <Button icon={<DeleteOutlined />} disabled={isUpdate} danger onClick={() => deleteModal(buildingsDelete(item), reload)} />
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
      <Card title='Buildings'>
        <Row gutter={[16, 16]} >
          <Col span={8} style={{ borderRight: '1px solid #f0f0f0' }} >
            <Form onFinish={handleFinish} layout='vertical' form={form} >
              <Form.Item label="Name" name='name' rules={[{ required: true, message: 'Maydon bo\'sh' }]} >
                <Input />
              </Form.Item>
              <Form.Item label="Location" name='location' rules={[{ required: true, message: 'Maydon bo\'sh' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Location" name='location_name' rules={[{ required: true, message: 'Maydon bo\'sh' }]}>
                <Input />
              </Form.Item>
              <Space>
                <Button type='primary' htmlType='submit' loading={loading} >{isUpdate ? 'Update' : 'Create'} Location</Button>
                {isUpdate ? <Button onClick={handleCanel}>Cancel</Button> : null}
              </Space>
            </Form>
          </Col>

          <Col span={16} >
            <Table dataSource={buildings} columns={columns} loading={loading} rowKey='id' ></Table>
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default Buildings