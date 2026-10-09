import api from './api'

export const verifyPayment = async (transactionId) => {
  const response = await api.get(`/payments/verify/${transactionId}`)
  return response.data
}