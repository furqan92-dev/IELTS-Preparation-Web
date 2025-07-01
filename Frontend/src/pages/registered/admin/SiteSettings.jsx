import { useEffect, useState } from "react";
import { Form, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAdminAccess } from "../../../hooks/useAdminAccess";

const SiteSettings = () => {
  const [logoPreview, setLogoPreview] = useState(null);
  const [form] = Form.useForm();
  const [tempLogoFile, setTempLogoFile] = useState(null);

  const authorized = useAdminAccess();
  const accessToken = localStorage.getItem("access token");

  useEffect(() => {
    if (authorized && accessToken) {
      fetchSettings();
    }
  }, [authorized, accessToken]);

  const fetchSettings = async () => {
    try {
      const res = await axios.get("http://localhost:8000/site-settings/");
      form.setFieldsValue({
        resourcesNotifications: res.data.resources_notifications === true,
      });
      if (res.data.logo_url) {
        setLogoPreview(res.data.logo_url);
      }
    } catch (err) {
      console.error("GET Error:", err);
    }
  };

  const onLogoChange = (info) => {
    const file = info.fileList[0]?.originFileObj;
    if (file) {
      setTempLogoFile(file);
    }
  };

  const onFinish = async () => {
    const values = form.getFieldsValue();
    const formData = new FormData();

    if (tempLogoFile) {
      formData.append("logo", tempLogoFile);
    }

    formData.append(
      "resources_notifications",
      values.resourcesNotifications ? "true" : "false"
    );

    try {
      const response = await axios.post(
        "http://localhost:8000/site-settings/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.logo_url) {
        setLogoPreview(response.data.logo_url);
      }

      message.success("Settings saved!");
      setTempLogoFile(null);
      fetchSettings();
    } catch (error) {
      console.error("POST Error:", error);
      message.error("Failed to save settings!");
    }
  };

  if (!authorized || !accessToken) {
    return <div className="text-center py-10">Unauthorized access</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-[700px] bg-white p-6 shadow-md rounded-xl">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Upload Logo">
            <Upload
              beforeUpload={() => false}
              showUploadList={false}
              onChange={onLogoChange}
              accept="image/*"
              maxCount={1}
            >
              <Button
                icon={<UploadOutlined />}
                className="hover:!border-[#1a4473] hover:!text-[#1a4473]"
              >
                Click to Upload Logo
              </Button>
            </Upload>

            {(tempLogoFile || logoPreview) && (
              <div className="mt-3">
                <img
                  src={
                    tempLogoFile
                    ? URL.createObjectURL(tempLogoFile)
                    : `http://localhost:8000/${logoPreview}`
                  }
                  alt="Logo Preview"
                  className="h-24"
                />
              </div>
            )}
          </Form.Item>

          <Button
            htmlType="submit"
            className="bg-[#003366] text-white border-none hover:!bg-[#1a4473] hover:!text-white hover:!border-none"
          >
            Save Settings
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SiteSettings;
