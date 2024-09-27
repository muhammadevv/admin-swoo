import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Drawer, Form, Image, Input, InputNumber, message, Row, Select, Space, Table, Upload } from 'antd'
import { EditOutlined, DeleteOutlined, UploadOutlined, } from '@ant-design/icons';
import { useLoad, usePatchRequest, usePostRequest } from '../../hooks/request'
import { floorList, homeList, buildingsList, clientsPatch, clientsPost, cakeList, cakePost, } from '../../constants/urls'
import useDeleteModal from '../../hooks/useDeleteModal'
import { slugify } from '../../utils/helpers';
import ImgCrop from 'antd-img-crop';
import axios from 'axios';

function CakePage() {

  const [imageUrl, setImageUrl] = useState(null);

  console.log(imageUrl);

  const handleUpload = async (options) => {
    const { file, onSuccess, onError } = options;

    const formData = new FormData();
    formData.append('file', file);  // API'ga faylni qo'shamiz

    try {
      const response = await axios.post('SIZNING_API_URL', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Agar muvaffaqiyatli bo'lsa:
      onSuccess("Fayl yuklandi");
      message.success("Tasvir muvaffaqiyatli yuklandi!");

      // API'dan kelgan rasm URL'ini oling va saqlang
      setImageUrl(response.data.url);
    } catch (error) {
      console.error("Tasvir yuklashda xatolik:", error);
      onError("Tasvir yuklanmadi");
      message.error("Tasvir yuklashda xatolik yuz berdi.");
    }
  };

  const [form] = Form.useForm()
  const postRequest = usePostRequest({ url: cakePost })
  const patchRequest = usePatchRequest()
  const [isUpdate, setIsUpdate] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const deleteModal = useDeleteModal()

  const { response: cakes, cakesLoading, request: reload } = useLoad({ url: cakeList })


  const title = Form.useWatch('name_uz', form)

  useEffect(() => {
    if (title && title.length) {
      form.setFieldValue('slug', slugify(title))
    }
  }, [title])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'index',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image) => <Image src={image} width={60} height={40} style={{ objectFit: 'contain' }} />
    },
    {
      title: 'Name',
      dataIndex: 'name_uz',
    },
    {
      title: 'Fillings',
      dataIndex: 'fillings',
      render: (fillings) => <span>{fillings.slice(0, 34)}...</span>
    },
    {
      title: 'category_uz',
      dataIndex: 'category_uz',
    },
    {
      title: 'cake_weight',
      dataIndex: 'cake_weight',
      render: (kg) => <span>{kg} kg</span>
    },
    {
      title: 'number_persons',
      dataIndex: 'number_persons',
      render: (kg) => <span>{kg} number_persons</span>
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (price) => <span>{price.toLocaleString()} UZS</span>
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

  console.log(cakes);

  const cake = {
    cake_weight: 8,
    category_uz: 9,
    fillings: "Mazali karamel tamli shirinlik tami va shuningdek katta hajmda snickers",
    id: 16,
    image: "https://blogsites.pythonanywhere.com/media/photos/tort9.webp",
    name_uz: "Konfet bar",
    number_persons: 19,
    price: 265000,
    slug: "konfet-olami",
    small_info: "Стоимость декора может рассчитываться отдельно",
    telephone_number: 998881204412
  }




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
        <Table dataSource={cakes} columns={columns} loading={cakesLoading} rowKey='id' size='small' ></Table>

        <Drawer title={`${isUpdate ? 'Update' : 'Add'} product`} onClose={handleCanel} open={isModalOpen} width={800} extra={<Button onClick={handleSubmit} >{isUpdate ? 'Update' : 'Add'}</Button>} >
          <Form layout='vertical' form={form} onFinish={handleFinish} >
            <Row layout='vertical' gutter={[12, 0]}>

              <Col span={12} >
                <Form.Item label="Name" name='name_uz' rules={[{ required: true, message: 'Maydon bo\'sh!' }]} >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item span label="Slug" name='slug'  >
                  <Input placeholder='smartphones..' value={title} />
                </Form.Item>
              </Col>



              <Col span={12} >
                <Form.Item label="Small info" value={'Стоимость декора может рассчитываться отдельно'} name='small_info' rules={[{ required: true, message: 'Maydon bo\'sh!' }]} >
                  <Input value={'sdlfhsdgaghg'} />
                </Form.Item>
              </Col>

              <Col span={12} >
                <Form.Item label="Fillings" name='fillings' rules={[{ required: true, message: 'Maydon bo\'sh!' }]} >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Price" name='price' rules={[{ type: 'number', required: true, message: 'Maydon bo\'sh!' }]} >
                  <InputNumber style={{ width: '100%' }} controls={false} />
                </Form.Item>
              </Col>

              <Col span={4}>
                <Form.Item label="cake_weight" name='cake_weight' rules={[{ type: 'number', required: true, message: 'Maydon bo\'sh!' }]} >
                  <InputNumber style={{ width: '100%' }} controls={false} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="category_uz" name='category_uz' rules={[{ type: 'number', required: true, message: 'Maydon bo\'sh!' }]} >
                  <InputNumber style={{ width: '100%' }} controls={false} />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="number_persons" name='number_persons' rules={[{ type: 'number', required: true, message: 'Maydon bo\'sh!' }]} >
                  <InputNumber style={{ width: '100%' }} controls={false} />
                </Form.Item>
              </Col>


              <div>
                <Upload
                name='image'
                  listType="picture"
                  // showUploadList={false}
                  customRequest={handleUpload}  // API'ga jo'natishni customRequest'da amalga oshiramiz
                >
                  <Button icon={<UploadOutlined />}>Tasvir yuklash</Button>
                </Upload>

                {/* Tasvir yuklangan bo'lsa, uni ko'rsatamiz */}
                {imageUrl && (
                  <div>
                    <h3>Yuklangan tasvir:</h3>
                    <Image width={200} src={imageUrl} />
                  </div>
                )}
              </div>


            </Row>
          </Form>
        </Drawer>
      </Card>
    </>
  )
}

export default CakePage