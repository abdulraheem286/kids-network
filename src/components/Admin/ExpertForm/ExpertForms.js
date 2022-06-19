import React, { useState, useEffect } from 'react'
import firebase from "firebase"
import { Collapse } from "antd"
const { Panel } = Collapse
const ExpertForms = () => {
    const [expertForms, setexpertForms] = useState([])
    useEffect(() => {
        async function getData() {
            try {
                const res = await firebase.firestore().collection("expertsForms").get()
                const forms = res.docs?.map(doc => ({ id: doc.id, ...doc.data() }))
                setexpertForms(forms)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    return (
        <Collapse accordion>
            {
                expertForms?.map((form, index) => (
                    <Panel key={form.id}>
                        {form?.id}
                    </Panel>
                ))
            }
        </Collapse>
    )
}

export default ExpertForms