import { Space } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductsByIdQuery } from '../services/api'
const AboutId = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data } = useGetProductsByIdQuery(id)
  return (
    <div className='mt-4'>
      <div className="mx">
        <div className="images">
          <Space orientation="vertical">
            <img
              className="dns"
              width="120px"
              height={"138px"}
              src={`https://store-api.softclub.tj/images/${data?.data?.images[0]?.images}`}
            />
            <img
              className="dns"
              width="120px"
              height={"138px"}
              src={`https://store-api.softclub.tj/images/${data?.data?.images[0]?.images}`}
            />
            <img
              className="dns"
              width="120px"
              height={"138px"}
              src={`https://store-api.softclub.tj/images/${data?.data?.images[0]?.images}`}
            />
            <img
              className="dns"
              width="120px"
              height={"138px"}
              src={`https://store-api.softclub.tj/images/${data?.data?.images[0]?.images}`}
            />
          </Space>
          <img
            width={"500px"}
            style={{ objectFit: "cover" }}
            height={"600px"}
            src={`https://store-api.softclub.tj/images/${data?.data?.images[0]?.images}`}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <h1 style={{ fontSize: "36px", font: "Inter" }}>
              {data?.data?.productName}
            </h1>
            <h1 style={{ fontSize: "34px", font: "Inter" }}>
              ${data?.data?.price}
            </h1>
            <p
              style={{
                color: "gray",
                fontSize: "24px",
                borderBottom: "1px solid black",
              }}
            >
              {data?.data?.description}
            </p>
            <h1
              style={{
                fontSize: "30px",
                font: "Inter",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "5px",
              }}
            >
              Colors:
              <span
                style={{
                  color: data?.data?.color,
                  background: data?.data?.color,
                  padding: "15px 15px",
                  borderRadius: "50%",
                }}
              ></span>
            </h1>
            <div style={{ display: "flex", gap: "18px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h1> Количество: {data?.data?.amount} </h1>
              </div>

            </div>
            <button
              style={{ display: "flex", justifySelf: "center" }}
              className=" w-28 bg-red-400 rounded-2xl text-white px-5 py-2"
              onClick={() => navigate(-1)}
            >
              Go back
            </button>

          </div>

        </div>

      </div>
    </div>
  )
}

export default AboutId
