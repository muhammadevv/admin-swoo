import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Input, InputNumber, Row, Select, Space, Switch, Table, Typography } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useLoad, usePatchRequest, usePostRequest } from '../../hooks/request'
import { buildingsDelete, buildingsList, buildingsPatch, buildingsPost, categoriesPatch, locationsList } from '../../constants/urls'
import { slugify } from '../../utils/helpers'
import useDeleteModal from '../../hooks/useDeleteModal'
import Item from 'antd/es/list/Item';


function Buildings() {

  const [form] = Form.useForm()
  const location_id = Form.useWatch('location_id', form)
  const postRequest = usePostRequest({ url: buildingsPost })
  const patchRequest = usePatchRequest()
  const [isUpdate, setIsUpdate] = useState(null)
  const deleteModal = useDeleteModal()

  const { response: buildings, buildingsLoading, request: reload } = useLoad({ url: buildingsList })
  const { response: locations, locationsLoading } = useLoad({ url: locationsList })

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Location',
      dataIndex: 'location_name',
    },
    {
      title: 'Buildings',
      dataIndex: 'name',
    },

    {
      title: 'Actions',
      render: (item) => (
        <Space>
          <Button icon={<EditOutlined />} disabled={isUpdate} onClick={() => handleEdit(item)} />
          <Button icon={<DeleteOutlined />} disabled={isUpdate} danger onClick={() => deleteModal(buildingsDelete(item.id), reload)} />
        </Space>
      )
    }
  ]

  const handleEdit = (item) => {
    form.setFieldsValue(item)
    setIsUpdate(item.id)
  }

  const handleFinish = async (data) => {
    const { success } = isUpdate ? await patchRequest.request({ url: buildingsPatch(isUpdate), data }) : await postRequest.request({ data })
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

  const location_name = locations?.find(item => item.id === location_id)

  useEffect(() => {
    form.setFieldValue('location_name', location_name?.location)
  }, [location_name])


  return (
    <>
      <Card title='Buildings'>
        <Row gutter={[16, 16]} >
          <Col span={8} style={{ borderRight: '1px solid #f0f0f0' }} >

            <Form onFinish={handleFinish} layout='vertical' form={form} >
              <Form.Item label="JOYLASHUV:" name='location_id' rules={[{ required: true, message: 'Maydon bo\'sh!' }]} >
                <Select loading={locationsLoading} onChange={(e) => form.setFieldValue('location_id', e)} options={locations?.map(item => ({ value: item.id, label: item.location }))} />
              </Form.Item>
              <Form.Item label="JOYLASHUV:" name='location_name' style={{ display: 'none' }} loading={locationsLoading} rules={[{ required: true, message: 'Maydon bo\'sh!' }]} >
                <Input />
              </Form.Item>
              <Form.Item label="Building" name='name' rules={[{ required: true, message: 'Maydon bo\'sh' }]} >
                <Input onChange={({ target }) => console.log(target.value.toLowerCase())} />
              </Form.Item>
              <Space>
                <Button type='primary' htmlType='submit' loading={buildingsLoading} >{isUpdate ? 'Update' : 'Create'} Location</Button>
                {isUpdate ? <Button onClick={handleCanel}>Cancel</Button> : null}
              </Space>
            </Form>
          </Col>

          <Col span={16} >
            <Table dataSource={buildings} columns={columns} loading={buildingsLoading} rowKey='id' ></Table>
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default Buildings