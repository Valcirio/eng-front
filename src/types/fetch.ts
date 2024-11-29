export type dataProductProps = {
  TIP_PEDIDO: string
  COD_PEDIDO: string
  DATA_PEDIDO: string
  VLR_PEDIDO: string
}

export type dataItemsProps = {
  DCR_PRODUTO: string
  QTD_PRODUTO: string
  VLR_TOTAL: string
}

export type dataAvalProps = {
  COD_AVALIACAO_PEDIDO: number
  COD_CLIENTE: number
  COD_PEDIDO: number
  NUM_NOTA_AVALIACAO: number
  TXT_AVALIACAO: string
  confidence: number
  sentiment: string
}
