import { useState } from "react";
import axios from "axios";
import { Input, Button, notification, Space, Row, Col } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

// Reusable Input Component
const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  min,
}) => (
  <div>
    <label className="ant-form-item-label">{label}</label>
    <Input
      type={type}
      min={min}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="ant-input"
    />
  </div>
);

// Reusable TextArea Component
const TextAreaField = ({ label, value, onChange, placeholder, rows = 8 }) => (
  <div>
    <label className="ant-form-item-label">{label}</label>
    <Input.TextArea
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className="ant-input"
    />
  </div>
);

// Reusable Button Component
const SubmitButton = ({ onClick, loading }) => (
  <Button
    onClick={onClick}
    type="primary"
    loading={loading}
    className="w-full"
    style={{ marginTop: "16px" }}
  >
    {loading ? <LoadingOutlined /> : "Create Paste"}
  </Button>
);

export default function Create() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/pastes",
        {
          content,
          ttl_seconds: ttl || undefined,
          max_views: views || undefined,
        },
        { headers: { "Content-Type": "application/json" } },
      );

      setUrl(res.data.url);
      setContent("");
      setTtl("");
      setViews("");

      notification.success({
        message: "Paste Created Successfully",
        description:
          "Your paste has been created successfully. You can view it below.",
      });
    } catch (err) {
      setError("Failed to create paste. Please try again.");
      notification.error({
        message: "Error",
        description: "There was an issue creating the paste. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center bg-gray-50 px-4 min-h-screen">
      <section className="bg-white shadow-sm p-6 border rounded-xl w-full max-w-3xl">
        <header className="mb-6 text-center">
          <h1 className="font-semibold text-gray-800 text-2xl">
            Create a Paste
          </h1>
          <p className="mt-1 text-gray-500 text-sm">
            Share text securely with optional expiry and view limits
          </p>
        </header>

        {/* Content TextArea */}
        <TextAreaField
          label="Paste Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your text here..."
        />

        {/* TTL and Max Views Inputs */}
        <Row gutter={16} className="mb-4">
          <Col span={12}>
            <InputField
              label="Time to Live (seconds)"
              value={ttl}
              onChange={(e) => setTtl(e.target.value)}
              type="number"
              placeholder="Optional"
              min="1"
            />
          </Col>
          <Col span={12}>
            <InputField
              label="Max Views"
              value={views}
              onChange={(e) => setViews(e.target.value)}
              type="number"
              placeholder="Optional"
              min="1"
            />
          </Col>
        </Row>

        {/* Error Message */}
        {error && <p className="mb-3 text-red-600 text-sm">{error}</p>}

        {/* Submit Button */}
        <SubmitButton onClick={submit} loading={loading} />

        {/* Paste URL */}
        {url && (
          <div className="bg-gray-50 mt-6 p-4 border rounded-lg">
            <p className="mb-1 text-gray-600 text-sm">
              Paste created successfully
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 hover:underline break-all"
            >
              {url}
            </a>
          </div>
        )}
      </section>
    </main>
  );
}
