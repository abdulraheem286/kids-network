import React, { useState, useEffect } from 'react'
import firebase from "firebase"
import { Button, Collapse, Input, Select } from "antd"
const { Panel } = Collapse
const ExpertForms = () => {
    const [expertForms, setexpertForms] = useState([])
    useEffect(() => {
        async function getData() {
            try {
                const res = await firebase.firestore().collection("expertsForms").where("approved", "==", false).get()
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
                    <Panel key={form.id} header={form.name}>
                        <ExpertForm form={form} />
                    </Panel>
                ))
            }
        </Collapse>
    )
}

export default ExpertForms
const ExpertForm = ({ form }) => {
    const [userForm, setuserForm] = useState(form)
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            await firebase.firestore().collection("expertsForms").doc(form.uid).update({
                ...userForm,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            await firebase.firestore().collection("users").doc(form.uid).update({
                expert: userForm?.approved,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form className='d-flex flex-column border p-2' onSubmit={submitHandler}>
            <div className="d-flex w-100 justify-content-between px-2">
                <label>Name</label>
                <Input disabled
                    className="my-1 w-50" required name='name'
                    type={"text"} value={userForm.name} />
            </div>
            <div className="d-flex w-100 justify-content-between px-2">
                <label>Email</label>
                <Input
                    disabled
                    placeholder='Why do you want to be an expert?'
                    className="my-1 w-50" required name='email'
                    type={"email"} value={userForm.email} />
            </div>
            <div className="d-flex w-100 justify-content-between px-2">
                <label>User ID</label>
                <Input disabled
                    placeholder='Why do you want to be an expert?'
                    className="my-1 w-50" required name='uid'
                    type={"text"} value={userForm.uid} />
            </div>
            <div className="d-flex w-100 justify-content-between px-2">
                <label>Address</label>
                <Input
                    disabled
                    className="my-1 w-50" required name='address'
                    type={"text"} value={userForm.address} />
            </div>
            <div className="d-flex w-100 justify-content-between px-2">
                <label>Phone</label>
                <Input
                    disabled
                    className="my-1 w-50" required name='phone'
                    type={"text"} value={userForm.phone} />
            </div>
            <div className="d-flex w-100 justify-content-between px-2">
                <label>Education</label>
                <Input
                    disabled
                    className="my-1 w-50" required name='education'
                    type={"text"} value={userForm.education} />
            </div>
            <div className="d-flex w-100 justify-content-between px-2">
                <label>Occupation</label>
                <Input
                    disabled
                    className="my-1 w-50" required name='occupation'
                    type={"text"} value={userForm.occupation} />
            </div>
            <div className="d-flex w-100 justify-content-between px-2">
                <label>Specialization</label>
                <Input
                    disabled
                    className="my-1 w-50" required name='specialization'
                    type={"text"} value={userForm.specialization} />
            </div>
            <div className="d-flex w-100 justify-content-between px-2">
                <label>Reason</label>
                <Input
                    disabled
                    className="my-1 w-50" required name='reason'
                    type={"text"} value={userForm.reason} />
            </div>


            <div className="d-flex w-100 justify-content-between px-2">
                <label>Approval</label>
                <Select
                    className="w-50" required
                    value={userForm.approved} onChange={e => setuserForm({ ...userForm, approved: e })} >
                    <Select.Option value={true}>
                        Approve
                    </Select.Option>
                    <Select.Option value={false}>
                        Decline
                    </Select.Option>
                </Select>
            </div>

            <div>
                <Button htmlType='submit' type='primary'>Submit</Button>
            </div>
        </form>
    )
}