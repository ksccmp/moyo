import axios from './axios';

const axiosNationList = async () => {
  try {
    return await axios.get('accompanyBoard/selectNation', {
      headers: { userToken: localStorage.token },
    });
  } catch (error) {
    console.error(error);
  }
};

const axiosCityList = async nid => {
  try {
    return await axios.get(`accompanyBoard/selectCity/${nid}`, {
      headers: { userToken: localStorage.token },
    });
  } catch (error) {
    console.error(error);
  }
};

const axiosTypeList = async () => {
  try {
    return await axios.get('accompanyBoard/selectTravelType', {
      headers: { userToken: localStorage.token },
    });
  } catch (error) {
    console.error(error);
  }
};

// 나라
export const getNationList = async (useNone = false) => {
  const res = await axiosNationList();
  let result = [];
  if (res && res.data && res.data.data) {
    result = res.data.data;
  }
  if (useNone) {
    result.unshift({ name: '무관', nid: 0 });
  }
  return result;
};
// 도시
export const getCityList = async (nid, useNone = false) => {
  const res = await axiosCityList(nid);
  let result = [];
  if (res && res.data && res.data.data) {
    result = res.data.data;
  }
  if (useNone) {
    result.unshift({ cid: 0, nid: 0, name: '무관' });
  }
  return result;
};

export const getAgeList = (useNone = false) => {
  let res = [
    { value: '1', age: '10', name: '10대' },
    { value: '2', age: '20', name: '20대' },
    { value: '3', age: '30', name: '30대' },
    { value: '4', age: '40', name: '40대' },
    { value: '5', age: '50', name: '50대+' },
  ];
  if (useNone) {
    res.unshift({ value: '0', age: '0', name: '무관' });
  }
  return res;
};

// 성별
export const getGenderList = (useNone = false) => {
  let res = [
    { value: 'M', name: '남자' },
    { value: 'F', name: '여자' },
  ];
  if (useNone) {
    res.unshift({ value: 'N', name: '무관' });
  }
  return res;
};

// 타입
export const getTypeList = async (useNone = false) => {
  const res = await axiosTypeList();
  let result = [];
  if (res && res.data && res.data.data) {
    result = res.data.data;
  }
  if (!useNone) {
    result = result.filter(item => item.tTypeId !== 0);
  }
  return result.map(item => {
    return { ttypeId: String(item.ttypeId), name: item.name };
  });
};
