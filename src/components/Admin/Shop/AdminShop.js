import { Button, Collapse, List, Tooltip, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import firebase from "firebase"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { ReloadOutlined } from "@ant-design/icons"
import Products from './Products'
import AddProduct from './AddProduct'
const { Panel } = Collapse
const AdminShop = () => {
    const [productCategory, setproductCategory] = useState([]);
    const [category, setcategory] = useState("");
    const [products, setproducts] = useState([])
    const [refresh, setrefresh] = useState(false);
    useEffect(() => {
        function loadData() {
            firebase
                .firestore()
                .collection("categories")
                .doc("productCategory")
                .get()
                .then((res) => {
                    if (res?.data()) {
                        setproductCategory(res.data()?.categories);
                    }
                });
            firebase.firestore().collection("products").get().then(snapshot => {
                setproducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
            }).catch(error => console.log(error))

        }
        loadData()
        setrefresh(false);
    }, [refresh]);
    const addProductCategory = (e) => {
        if (!category) {
            alert("Make sure to add a valid value")
            return
        }
        e.preventDefault();
        setproductCategory([...productCategory, category]);
        setcategory("");
    };
    const saveCategory = async (e) => {
        e.preventDefault();
        try {
            await firebase
                .firestore()
                .collection("categories")
                .doc("productCategory")
                .set({ categories: productCategory });
        } catch (error) {
            console.log(error);
        }
    };
    const removeCategory = (item) => {
        setproductCategory(productCategory.filter((category) => category !== item));
    };
    return (
        <div>
            <Tooltip title="refresh">
                <Button
                    type="primary"
                    onClick={() => setrefresh(!refresh)}
                    icon={<ReloadOutlined />}
                >
                    Refresh
                </Button>
            </Tooltip>
            <Collapse accordion>
                <Panel
                    header="Product Category"
                    key="1"
                    extra={
                        <Button type="primary" onClick={saveCategory}>
                            Save
                        </Button>
                    }
                >
                    <List
                        bordered
                        dataSource={productCategory.filter(item => item !== "All")}
                        renderItem={(item, index) => (
                            <List.Item className=" p-2 w-50 d-flex justify-content-between">
                                <div>
                                    <Typography.Text mark>{index}</Typography.Text> {item}
                                </div>
                                <FontAwesomeIcon
                                    icon={faTrashCan}
                                    onClick={() => removeCategory(item)}
                                />
                            </List.Item>
                        )}
                    />
                    <form className="d-flex">
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setcategory(e.target.value)}
                            className="w-25"
                            placeholder="Add Category"
                        />
                        <Button className="ml-4" type="primary" onClick={addProductCategory}>
                            Add Course Category{" "}
                        </Button>
                    </form>
                </Panel>
                <Panel key="2" header="Products" extra={<AddProduct categories={productCategory} />}>
                    <Products products={products} categories={productCategory} />
                </Panel>
            </Collapse>
        </div>
    )
}

export default AdminShop