import { SupabaseClient } from '@supabase/supabase-js'
import { Button, Form, Input, Typography, Select } from '@supabase/ui'
import { useState } from 'react'
import { ProductContact } from '~/types/products'
import { TagsInput } from "react-tag-input-component";
import {input} from "sucrase/dist/types/parser/traverser/base";

const INITIAL_VALUES = {
  type: 'tools',
  name: '',
  website_url: '',
  description: '',
  category: '',
  developer: '',
  email: '',
  logo: '',
  images: [],
  overview: '',
  tags: [],
  pricing_model: '',
  status: 'wait_deal',
}

const validate = (values: any) => {
  const errors: any = {}

  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.website_url) {
    errors.website_url = 'Required'
  }else if (!/^https?:\/\/\S+$/i.test(values.website_url)){
    errors.website_url = 'Invalid url'
  }

  if (!values.description) {
    errors.description = 'Required'
  }
  if (!values.category) {
    errors.category = 'Required'
  }
  if (!values.developer) {
    errors.developer = 'Required'
  }
  if (!values.email) {
    errors.email = 'Required'
  }
  if (!values.logo) {
    errors.logo = 'Required'
  }
  if (!values.overview) {
    errors.overview = 'Required'
  }
  if (!values.pricing_model) {
    errors.pricing_model = 'Required'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

export default function BecomeAPartner({ supabase }: { supabase: SupabaseClient }) {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)
  const [selected, setSelected] = useState([])
  const [file, setFile] = useState()
  const tagInputClass={"input":"bg-black"}
  const pricing_model = ['', 'free' , 'free trial' , 'freemium' , 'paid' , 'price unknown']

  const fileChange = async (event:any) =>{
    console.log("file change")
    console.log(event.target.files[0])
    setFile(event.target.files[0])
  }

  const handleFormSubmit = async (values:any) => {

    values.create_time = new Date().getTime()
    values.tags = selected
    values.logoFile = file
    console.log(values)

    let ext = values.logo.slice(((values.logo.lastIndexOf(".") - 1) >>> 0) + 2)
    let random = Math.random().toString(36).substring(2);
    let dataResult = {
      Key: ""
    }

    {
      const {data, error} = await supabase.storage
          .from('product_img_pub')
          // @ts-ignore
          .upload("avatar/" + (random + "." + ext), file, {
            cacheControl: '3600',
            upsert: false
          })
      // @ts-ignore
      dataResult = data
    }
    {
      const {data} = supabase
          .storage
          .from('product_img_pub')
          .getPublicUrl(dataResult?.Key)
      values.logoUrl = data?.publicURL
    }

    const { error } = await supabase.from<ProductContact>('partner_contacts').insert(
      [
        {
          type: values.type,
          name: values.name,
          website_url: values.website_url,
          description: values.description,
          category: values.category,
          developer: values.developer,
          email: values.email,
          logo: values.logoUrl,
          images: values.images,
          tags: values.tags,
          overview: values.overview,
          pricing_model: values.pricing_model,
          status: values.status,
        },
      ],
      { returning: 'minimal' }
    )

    // TODO: handle error
    console.log('error:', error)

    setFormSubmitted(true)
  }

  return (
    <div className="border-t">
      <div id="become-a-partner" className="max-w-2xl mx-auto space-y-12 py-12 px-6">
        <h2 className="h2">Submit Ai Tool</h2>

        <Form initialValues={INITIAL_VALUES} validate={validate} onSubmit={handleFormSubmit}>
          {({ isSubmitting }: any) => (
            <div className="grid grid-cols-2 gap-x-6 gap-y-1">
              <div className="h-24">
                <Input
                  label="Name *"
                  id="name"
                  name="name"
                  layout="vertical"
                  placeholder="ChatGpt"
                />
              </div>

              <div className="h-24">
                <Input
                  label="Website Url *"
                  id="website_url"
                  name="website_url"
                  layout="vertical"
                  placeholder="https://**"
                />
              </div>

              <div className="h-24">
                <Input
                  label="Category *"
                  id="category"
                  name="category"
                  layout="vertical"
                  placeholder="Chat"
                />
              </div>

              <div className="h-24">
                <Input
                  label="Developer *"
                  id="developer"
                  name="developer"
                  layout="vertical"
                  placeholder=""
                />
              </div>

              <div className="h-24">
                <Input
                    label="Business email *"
                    id="email"
                    name="email"
                    layout="vertical"
                    placeholder="janedoe@example.sg"
                />
              </div>

              <div className="h-24">
                <Select
                    label="Pricing Model *"
                    id="pricing_model"
                    name="pricing_model"
                    layout="vertical"
                >
                  {pricing_model.map((model) => (
                      <Select.Option key={model} value={model}>{model}</Select.Option>
                  ))}
                </Select>
              </div>

              <div className="h-24">
                <Input
                    label="Logo *"
                    id="logo"
                    name="logo"
                    type="file"
                    layout="vertical"
                    onChange={fileChange}
                />
              </div>


              <div className="col-span-2">
                <Typography.Text type="secondary">
                  Tags
                </Typography.Text>
                <TagsInput
                    value={selected}
                    // @ts-ignore
                    onChange={setSelected}
                    name="tags"
                    placeHolder="tags"
                    // classNames={tagInputClass}
                />
              </div>


              <div className="col-span-2 mt-4">
                <Input.TextArea
                  id="description"
                  name="description"
                  label="Brief Introduction *"
                  placeholder="Please briefly introduce your product..."
                  rows={2}
                />
              </div>

              <div className="col-span-2 mt-4">
                <Input.TextArea
                  id="overview"
                  name="overview"
                  label="Overview *"
                  placeholder="Please provide a detailed introduction to your product..."
                  rows={10}
                />
              </div>

              <div className="flex flex-row-reverse w-full col-span-2 pt-4">
                <Button
                  size="xlarge"
                  disabled={formSubmitted}
                  loading={isSubmitting}
                  htmlType="submit"
                >
                  Send
                </Button>
              </div>
            </div>
          )}
        </Form>

        {formSubmitted && <h3 className="h3">Thank you, we will review it as soon as possible. 👁⚡️👁</h3>}
      </div>
    </div>
  )
}
