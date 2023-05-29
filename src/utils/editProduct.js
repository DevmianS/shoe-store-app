import axios from 'axios';

import {executeError, executeSucces} from './utils';

export const contentDescription = `Effortlessly manage your shop's product inventory with our intuitive
form for adding and editing products. Streamline your workflow and
stay organized as you easily input and update product details such
as name, description, price, and availability. With a user-friendly
interface and comprehensive fields, you can swiftly add new products
or make changes to existing ones. Enhance your online store's
efficiency and maintain accurate product information with our
convenient form, designed to simplify the process of managing your
shop's offerings. Start optimizing your product management today!`;

export const selectsInit = {
  gender: 'Men',
  brand: 'Nike',
  color: 'Black',
  size: '36',
};

export async function updateProductSubmit({
  genders,
  select,
  brands,
  price,
  categories,
  sizes,
  colors,
  name,
  arrImgId,
  description,
  jwt,
  productId,
}) {
  const idGender = String(
    genders.find(gender => gender.name == select.gender)?.id,
  );
  const idBrand = String(brands.find(brand => brand.name == select.brand)?.id);
  const idColor = String(colors.find(color => color.name == select.color)?.id);

  const categoriesArr = categories
    .filter(category => category.needed)
    .map(category => String(category.id));

  const idSize = String(sizes.find(size => size.value == select.size)?.id);

  const obj = {
    data: {
      name: name,
      images: arrImgId,
      description: description,
      brand: idBrand,
      categories: categoriesArr,
      gender: idGender,
      color: idColor,
      size: idSize,
      price: price,
    },
  };

  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
      obj,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
        },
      },
    );

    if (res.status == '200') {
      executeSucces('Product updated succesfully.');
      return res;
    }
  } catch (error) {
    executeError('There was an error.');
  }
}
export async function fetchById(id) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${id}?populate=*`,
    );
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    executeError(error.message);
    return null;
  }
}
async function transformFilesFromURLs(fileURLs) {
  try {
    const transformedFiles = await Promise.all(
      fileURLs.map(async fileURL => {
        const response = await axios.get(fileURL, {responseType: 'blob'});
        const blob = response.data;
        const transformedFile = new File([blob], fileURL, {type: blob.type});
        return transformedFile;
      }),
    );

    return transformedFiles;
  } catch (error) {
    console.error('Image error:', error);
    return [];
  }
}
export async function filesToStateHandler(fileIds, fileURLs, setFilesState) {
  const transformedFiles = await transformFilesFromURLs(fileURLs);
  if (transformedFiles.length > 0) {
    setFilesState([
      ...fileURLs.map((_, i) => ({
        id: fileIds[i],
        image: fileURLs[i],
        file: transformedFiles[i],
      })),
    ]);
  }
}

export function getEditData(result) {
  return {
    name: result?.data?.attributes?.name,
    price: result?.data?.attributes?.price,
    categories: [...result?.data?.attributes?.categories?.data].map(
      c => c.attributes.name,
    ),
    gender: result?.data?.attributes?.gender?.data?.attributes?.name,
    size: result?.data?.attributes?.size?.data?.attributes?.value,
    description: result?.data?.attributes?.description,
    color: result?.data?.attributes?.color?.data?.attributes?.name || 'Black',
    brand: result?.data?.attributes?.brand?.data?.attributes?.name,
  };
}
