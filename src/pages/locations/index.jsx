import { useState } from 'react'
import { Button, Card, Col, Form, Input, Row, Space, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useLoad, usePatchRequest, usePostRequest, usePutRequest } from '../../hooks/request'
import { locationsDelete, locationsList, locationsPost, locationsPut } from '../../constants/urls'
import useDeleteModal from '../../hooks/useDeleteModal'


function Locations() {

  const [form] = Form.useForm()
  const postRequest = usePostRequest({ url: locationsPost })
  const patchRequest = usePatchRequest()
  const putRequest = usePutRequest()
  const [isUpdate, setIsUpdate] = useState(null)
  const deleteModal = useDeleteModal()

  const { response: locations, loading, request: reload } = useLoad({ url: locationsList })



  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Locations',
      dataIndex: 'location',
    },

    {
      title: 'Actions',
      render: (item) => (
        <Space>
          <Button icon={<EditOutlined />} disabled={isUpdate} onClick={() => handleEdit(item)} />
          <Button icon={<DeleteOutlined />} disabled={isUpdate} danger onClick={() => deleteModal(locationsDelete(item.id), reload)} />
        </Space>
      )
    }
  ]

  const handleEdit = (item) => {
    form.setFieldsValue(item)
    setIsUpdate(item.id)
  }

  const handleFinish = async (data) => {
    const { success } = isUpdate ? await patchRequest.request({ url: locationsPut(isUpdate), data }) : await postRequest.request({ data })
    if (success) {
      reload()
      form.resetFields()
      setIsUpdate(null)
    }
    console.log(data);
  }

  const handleCanel = () => {
    setIsUpdate(null)
    form.resetFields()
  }

  return (
    <>
      <Card title='Locations'>
        <Row gutter={[16, 16]} >
          <Col span={8} style={{ borderRight: '1px solid #f0f0f0' }} >
            <Form onFinish={handleFinish} layout='vertical' form={form} >
              <Form.Item label="Locations" name='location' rules={[{ required: true, message: 'Maydon bo\'sh' }]} >
                <Input />
              </Form.Item>

              <Space>
                <Button type='primary' htmlType='submit' loading={loading} >{isUpdate ? 'Update' : 'Create'} Location</Button>
                {isUpdate ? <Button onClick={handleCanel}>Cancel</Button> : null}
              </Space>
            </Form>
          </Col>

          <Col span={16} >
            <Table dataSource={locations} columns={columns} loading={loading} rowKey='id' ></Table>
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default Locations