import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SubCategories = () => {
  const navigate = useNavigate();
  const [subcategory, setSubCategory] = useState<any>([]);
  async function getSubCategories(id: any) {
    try {
      const res = await fetch(
        `https://store-api.softclub.tj/Category/get-category-by-id?id=${id}`
      );
      const data = await res.json();
      setSubCategory(data?.data?.subCategories);
    } catch (error) {
      console.error(error);
    }
  }
  const { id } = useParams();
  useEffect(() => {
    getSubCategories(id);
  }, []);
  return (
    <div>
      <button
        className="bg-purple-500 rounded-2xl border-0 text-white  px-4 py-2 mt-2 w-32"
        onClick={() => navigate(-1)}
      >
        {"<   "} Go back
      </button>
      <div className="carts">
        {subcategory?.map((e: any) => (
          <div
            onClick={() => navigate(`/products/${e.id}`)}
            className="cursor-pointer shadow-2xl w-55 h-40 p-10 text-center flex flex-col  rounded-2xl"
          >
            <h1>{e.subCategoryName}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCategories;
