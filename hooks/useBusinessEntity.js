import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const useBusinessEntity = () => {
    const { localVariable } = useSelector(({ dataSlice }) => dataSlice)
    let [businessId, setBusinessId] = useState(null)
    useEffect(() => {
        if (!localVariable['business_entity_id']) return
        setBusinessId(JSON.parse(localVariable['business_entity_id']))
    }, [localVariable])
    return businessId
}

export default useBusinessEntity