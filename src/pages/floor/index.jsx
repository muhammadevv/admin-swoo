import { useState } from 'react'
import { Button, Card, Col, Form, Input, Row, Select, Space, Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useLoad, usePatchRequest, usePostRequest, usePutRequest } from '../../hooks/request'
import { buildingsList, categoriesDelete, categoriesPatch, categoriesPost, floorDelete, floorList, floorPatch, floorPost, locationsList, locationsPut } from '../../constants/urls'
import useDeleteModal from '../../hooks/useDeleteModal'


function Floor() {

  const [form] = Form.useForm()
  const postRequest = usePostRequest({ url: floorPost })
  const patchRequest = usePatchRequest()
  const putRequest = usePutRequest()
  const [isUpdate, setIsUpdate] = useState(null)
  const deleteModal = useDeleteModal()

  const { response: floor, loading, request: reload } = useLoad({ url: floorList })
  const { response: locations, locationsLoading, } = useLoad({ url: locationsList })
  const { response: buildings, buildingsLoading, } = useLoad({ url: buildingsList })


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
          <Button icon={<DeleteOutlined />} disabled={isUpdate} danger onClick={() => deleteModal(floorDelete(item.id), reload)} />
        </Space>
      )
    }
  ]

  const handleEdit = (item) => {
    form.setFieldsValue(item)
    setIsUpdate(item.id)
  }

  const handleFinish = async (data) => {
    const { success } = isUpdate ? await patchRequest.request({ url: floorPatch(isUpdate), data }) : await postRequest.request({ data })
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
              <Form.Item label="Location" name='location_id' rules={[{ required: true, message: 'Maydon bo\'sh!' }]} >
                <Select loading={locationsLoading} onChange={(e) => form.setFieldValue('location_id', e)} options={locations?.map(item => ({ value: item.id, label: item.location }))} />
              </Form.Item>
              <Form.Item label="Building" name='building_id' rules={[{ required: true, message: 'Maydon bo\'sh!' }]} >
                <Select loading={buildingsLoading} onChange={(e) => form.setFieldValue('building_id', e)} options={buildings?.map(item => ({ value: item.id, label: item.name }))} />
              </Form.Item>
              <Form.Item label="TO'LOV MUDDATI:" name='term_display' rules={[{ required: true, message: 'Maydon bo\'sh!' }]} >
                <Select loading={buildingsLoading} onChange={(e) => form.setFieldValue('term_display', e)} options={buildings?.buildings?.map(item => ({ value: item.id, label: item.title }))} />
              </Form.Item>
              <Form.Item label="Title" name='name' rules={[{ required: true, message: 'Maydon bo\'sh' }]} >
                <Input />
              </Form.Item>
              <Form.Item label="Title" name='name' rules={[{ required: true, message: 'Maydon bo\'sh' }]} >
                <Input />
              </Form.Item>
              <Space>
                <Button type='primary' htmlType='submit' loading={loading} >{isUpdate ? 'Update' : 'Create'} floor</Button>
                {isUpdate ? <Button onClick={handleCanel}>Cancel</Button> : null}
              </Space>
            </Form>
          </Col>

          <Col span={16} >
            <Table dataSource={floor?.floor} columns={columns} loading={loading} rowKey='id' ></Table>
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default Floor