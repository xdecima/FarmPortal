import { useAppForm } from '@/helpers/form';
import { useStore } from '@tanstack/react-form';
import { createFileRoute } from '@tanstack/react-router'
import type { LatLng, LeafletMouseEvent } from 'leaflet';
import React, { useState } from 'react'

import { MapContainer, Polygon, TileLayer, useMapEvents } from 'react-leaflet'

export const Route = createFileRoute('/property/create')({
    component: Page,
})

function Page() {

    const form = useAppForm({
        defaultValues: {
            owner: {
                name: "",
                surname: "",
                dob: new Date(),
                gender: "",
            },
            location: "",
            bounds: [],
        } as {
            owner: {
                name: string;
                surname: string;
                dob: Date,
                gender: string;
            },
            location: string;
            bounds: LatLng[],
        },
        onSubmit: ({ value }) => {
            // Do something with form data
            console.log(value)
        },
    })



    return (
        <div className="flex flex-1 min-h-0 overflow-auto p-4 justify-center">
            <form.AppForm>
                <form.Form onSubmit={form.handleSubmit} className="w-full h-full flex flex-1 flex-row max-w-7xl gap-2">
                    <div className='flex-1 flex flex-col justify-start gap-4'>
                        <div className='grid grid-cols-4 gap-4'>
                            <div className='col-span-2'>
                                <form.AppField
                                    name="owner.name"
                                    children={(field) => (
                                        <field.Input label="First Name" />
                                    )}
                                />
                            </div>
                            <div className='col-span-2'>
                                <form.AppField
                                    name="owner.surname"
                                    children={(field) => (
                                        <field.Input label="Last Name" />
                                    )}
                                />
                            </div>
                            <div className="col-span-3">
                                <form.AppField
                                    name="owner.dob"
                                    children={(field) => (
                                        <field.Input label="Date of birth" />
                                    )}
                                />
                            </div>
                            <div className="col-span-1">
                                <form.AppField
                                    name="owner.gender"
                                    children={(field) => (
                                        <field.Input label="Gender" />
                                    )}
                                />
                            </div>
                            <div className="col-span-full">
                                <form.AppField
                                    name="location"
                                    children={(field) => (
                                        <field.Input label="Location" />
                                    )}
                                />
                            </div>
                        </div>
                        <form.Submit>Save</form.Submit>
                    </div>
                    <div className='flex-1 bg-blue-500 flex flex-col'>
                        <MapContainer center={[38.083128526881296, 15.722615545058511]} zoom={20} className="flex-1 w-full h-full">
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}"
                                subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                                maxZoom={20}
                            />
                            <form.Field name="bounds" mode="array">
                                {(field) => (
                                    <React.Fragment>
                                        <Polygon positions={field.state.value} pathOptions={{ color: "red" }} />
                                        <PropertyBoundSelector onClick={(ev) => field.pushValue(ev.latlng)} />
                                    </React.Fragment>
                                )}
                            </form.Field>
                        </MapContainer>
                    </div>
                </form.Form>
            </form.AppForm>
        </div>
    )
}

function PropertyBoundSelector({ onClick }: { onClick: (ev: LeafletMouseEvent) => any }) {
    useMapEvents({ click: onClick })
    return null;
}