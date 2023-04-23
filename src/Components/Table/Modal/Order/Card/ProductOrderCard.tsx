import React from 'react'
import { MultiSelectElement } from '../../../../Input'

interface Props {
    title: string,
    index: number,
    setSelectedProduct: React.Dispatch<React.SetStateAction<{
        label: string;
        value: number | undefined;
        quantity: number;
        variant: string[];
        allVariant: string[] | undefined;
    }[]>>,
    selectedProduct: {
        label: string;
        value: number | undefined;
        quantity: number;
        variant: string[];
        allVariant: string[] | undefined;
    }[],
    dt: {
        label: string;
        value: number | undefined;
        quantity: number;
        variant: string[];
        allVariant: string[] | undefined;
    }
}
export default function ProductOrderCard({ title, index, setSelectedProduct, selectedProduct, dt }: Props): JSX.Element {

    const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSelectedProduct = [...selectedProduct]
        newSelectedProduct[index].quantity = parseInt(e.target.value)
        setSelectedProduct(newSelectedProduct)
    }

    const FormatVariantOnOnceArray = (data: any) => {
        var once_array = []

        for (let i = 0; i < data.length; i++) {
            once_array.push(data[i].value)
        }

        return once_array
    }

    const handleChangeVariant = (value: any) => {
        const newSelectedProduct = [...selectedProduct]
        newSelectedProduct[index].variant = FormatVariantOnOnceArray(value)
        setSelectedProduct(newSelectedProduct)
    }

    const FormatVariantOption = (data: any) => {

        var objArr: { label: string, value: string }[] = []

        for (let i = 0; i < data.length; i++) {
            objArr.push({ label: data[i], value: data[i] })
        }

        return objArr
    }

    return (
        <div>
            <div className="card">
                <div className="card-header border-0 pb-0">
                    <h5 className="card-title">{title}</h5>
                </div>
                <div className="card-body">
                    <p className="card-text">
                        <div className="input-group mb-3  input-success">
                            <span className="input-group-text">Quantity</span>
                            <input
                                min={1}
                                onChange={handleChangeQuantity}
                                defaultValue={dt.quantity || 1}
                                type="number"
                                className="form-control"
                            />
                        </div>
                        <MultiSelectElement options={dt.variant ? FormatVariantOption(dt.allVariant) : []} selected={FormatVariantOption(dt.variant)} onChange={handleChangeVariant} />
                    </p>
                </div>
            </div>
        </div>

    )
}
