import React, { useState } from 'react'
import { Button, Card, Col, Drawer, Form, Image, Input, InputNumber, Row, Select, Space, Table } from 'antd'
import { EditOutlined, DeleteOutlined, } from '@ant-design/icons';
import { useLoad, usePatchRequest, usePostRequest } from '../../hooks/request'
import { clientsList, locationsList, floorList, homeList, buildingsList, clientsPatch, clientsPost } from '../../constants/urls'
import useDeleteModal from '../../hooks/useDeleteModal'

function Home() {

  const [form] = Form.useForm()
  const postRequest = usePostRequest({ url: clientsPost })
  const patchRequest = usePatchRequest()
  const [isUpdate, setIsUpdate] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const deleteModal = useDeleteModal()

  const { response: clients, clientsLoading, request: reload } = useLoad({ url: clientsList })
  const { response: buildings, buildingsLoading, } = useLoad({ url: buildingsList })
  const { response: home, homeLoading, } = useLoad({ url: homeList })
  const { response: floor, floorLoading, } = useLoad({ url: floorList })
  const { response: locations, locationsLoading, } = useLoad({ url: locationsList })

  const columns = [
    {
      title: 'F.I.SH',
      dataIndex: 'fish',
    },
    {
      title: 'TELEFON',
      dataIndex: 'telefon',
    },
    {
      title: 'PASSPORT',
      dataIndex: 'passport',
    },
    {
      title: 'TO\'LOV MUDDATI',
      dataIndex: 'term_display',
    },
    {
      title: 'OYLAR',
      dataIndex: 'count_month',
    },
    {
      title: 'UY',
      dataIndex: 'home_name',
    },
    {
      title: 'UY NARXI',
      dataIndex: 'price_home',
    },
    {
      title: 'QOLGAN TO\'LOVLAR',
      dataIndex: 'residual',
    },
    {
      title: 'OLDINDAN TO\'LOV',
      dataIndex: 'advance_term',
    },
    {
      title: 'STATUS',
      dataIndex: 'status_display',
    },
    {
      title: 'SHARTNOMA',
      dataIndex: 'oylar',
    },
    {
      title: 'OYLIK AYIRISH',
      dataIndex: 'oylar',
    },
    {
      title: 'Actions',
      render: (item) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(item)} />
          <Button icon={<DeleteOutlined />} danger onClick={() => deleteModal(productsDelete(item.id), reload)} />
        </Space>
      )
    }
  ]

  console.log(clients?.clients);


  const handleEdit = (item) => {
    form.setFieldsValue(item)
    setIsUpdate(item.id)
    setIsModalOpen(true)
  }

  const handleFinish = async (data) => {
    const { success } = isUpdate ? await patchRequest.request({ url: clientsPatch(isUpdate), data }) : await postRequest.request({ data })
    if (success) {
      reload()
      handleCanel()
    }
  }

  const handleCanel = () => {
    setIsModalOpen(false)
    setIsUpdate(null)
    form.resetFields()
  }

  const handleSubmit = () => {
    form.submit()
  }

  const handleAdd = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <Card title='Mijozlar' extra={<Button onClick={handleAdd} >+ Add</Button>}>
        <Table dataSource={clients?.clients} columns={columns} loading={clientsLoading} rowKey='id' size='small' ></Table>
        <Drawer title={`${isUpdate ? 'Update' : 'Add'} product`} onClose={handleCanel} open={isModalOpen} width={800} extra={<Button onClick={handleSubmit} >{isUpdate ? 'Update' : 'Add'}</Button>} >
          <Form layout='vertical' form={form} onFinish={handleFinish} >
            <Row layout='vertical' gutter={[12, 0]}>
              <Col span={24} >
                <Form.Item label="F.I.SH" name='fish' rules={[{ required: true, message: 'Maydon bo\'sh!' }]} >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="TELEFON" name='telefon' rules={[{ type: 'number', required: true, message: 'Maydon bo\'sh!' }]} >
                  <InputNumber prefix='+998' style={{ width: '100%' }} controls={false} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="PASSPORT" name='passport' rules={[{ required: true, message: 'Maydon bo\'sh!' }]} >
                  <Input.OTP formatter={(str) => str.toUpperCase()} length={9} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="OLDINDAN TO'LOV" name='phone' rules={[{ type: 'number', required: true, message: 'Maydon bo\'sh!' }]} >
                  <InputNumber style={{ width: '100%' }} controls={false} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="TO'LOV MUDDATI:" name='term_display' rules={[{ required: true, message: 'Maydon bo\'sh!' }]} >
                  <Select loading={clientsLoading} onChange={(e) => form.setFieldValue('term_display', e)} options={buildings?.buildings?.map(item => ({ value: item.id, label: item.title }))} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="JOYLASHUV:" name='location_name' rules={[{ required: true, message: 'Maydon bo\'sh!' }]} >
                  <Select loading={locationsLoading} onChange={(e) => form.setFieldValue('location_name', e)} options={locations?.locations?.map(item => ({ value: item.id, label: item.title }))} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="BINO:" name='building_name' rules={[{ required: true, message: 'Maydon bo\'sh!' }]} >
                  <Select loading={buildingsLoading} onChange={(e) => form.setFieldValue('building_name', e)} options={buildings?.buildings?.map(item => ({ value: item.id, label: item.title }))} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="QAVAT:" name='floor_name' rules={[{ required: true, message: 'Maydon bo\'sh!' }]} >
                  <Select loading={floorLoading} onChange={(e) => form.setFieldValue('floor_name', e)} options={floor?.floor?.map(item => ({ value: item.id, label: item.title }))} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="UY:" name='home_name' rules={[{ required: true, message: 'Maydon bo\'sh!' }]} >
                  <Select loading={homeLoading} onChange={(e) => form.setFieldValue('home_name', e)} options={home?.home?.map(item => ({ value: item.id, label: item.title }))} />
                </Form.Item>
              </Col>

            </Row>
          </Form>
        </Drawer>
      </Card>
    </>
  )
}

export default Home