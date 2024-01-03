const useGlobalInformationStore = defineStore(
  // 唯一ID
  'globalInformation',
  () => {
    const iconInformation = ref<Array<any>>([])
    return {
      iconInformation,
    }
  },
)

export default useGlobalInformationStore
