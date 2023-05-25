import {useEffect, useState} from 'react';
import axios from 'axios';

const brandApi = process.env.NEXT_PUBLIC_API_URL + '/brands?fields=name';

const categoriesApi =
  process.env.NEXT_PUBLIC_API_URL + '/categories?fields=name';

const genderApi = process.env.NEXT_PUBLIC_API_URL + '/genders?fields=name';

const sizeApi = process.env.NEXT_PUBLIC_API_URL + '/sizes?fields=value';

const colorApi = process.env.NEXT_PUBLIC_API_URL + '/colors?fields=name';

const useProductData = () => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [genders, setGenders] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  const [canRenderFilter, setCanRenderFilter] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (brands && categories && genders && sizes && colors) {
      setCanRenderFilter(true);
    } else {
      setCanRenderFilter(false);
    }
  }, [brands, categories, genders, sizes, colors]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          requestBrands(),
          requestCategories(),
          requestGender(),
          requestSizes(),
          requestColors(),
        ]);
        setIsLoading(false);
      } catch (error) {
        // Manejar errores en caso de que alguna de las solicitudes falle
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const requestBrands = async () => {
    const {data: res} = await axios.get(brandApi);
    const brands = res.data.map(brand => {
      return {
        id: brand.id,
        name: brand.attributes.name,
        needed: false,
      };
    });
    setBrands(brands);
  };

  const requestColors = async () => {
    const {data: res} = await axios.get(colorApi);
    const colors = res.data.map(color => {
      return {
        id: color.id,
        name: color.attributes.name,
        needed: false,
      };
    });
    setColors(colors);
  };

  const requestCategories = async () => {
    const {data: res} = await axios.get(categoriesApi);
    const categories = res.data.map(categorie => {
      return {
        id: String(categorie.id),
        name: String(categorie.attributes.name),
        needed: false,
      };
    });
    setCategories(categories);
  };

  const requestGender = async () => {
    const {data: res} = await axios.get(genderApi);
    const genders = res.data.map(gender => {
      return {
        id: String(gender.id),
        name: String(gender.attributes.name),
        needed: false,
      };
    });
    setGenders(genders);
  };

  const requestSizes = async () => {
    const {data: res} = await axios.get(sizeApi);
    const sizes = res.data.map(size => {
      return {
        id: String(size.id),
        value: String(size.attributes.value),
        needed: false,
      };
    });
    setSizes(sizes);
  };

  if (isLoading) {
    // Devolver un estado de carga mientras se cargan los datos
    return {isLoading};
  }

  // Devolver los datos cuando estén disponibles
  return {
    canRenderFilter,
    brands,
    categories,
    genders,
    sizes,
    colors,
    isLoading,
    setSizes,
    setCategories,
    setGenders,
    setBrands,
    setColors,
  };
};

export default useProductData;
