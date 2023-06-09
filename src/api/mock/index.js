import usemock from '../../model/usemock'

export const getCategoryDetailData = (params) => usemock('./mock/categories/categoriesdetail' + params)

export const kwSearch = () => usemock('./mock/kwSearch.json')