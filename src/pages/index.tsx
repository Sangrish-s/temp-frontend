import React, { useState } from 'react';
import { NextPage } from "next";
import FormButton from "@/components/button";
import Container from "@/components/paper/container";
import SearchInput from "@/components/inputs/search";
import FilterBox from "@/components/paper/box/filter";
import GridBox from "@/components/paper/box/grid";
import FlexBox from "@/components/paper/box/flex";
import BusinessSelect from "@/components/inputs/select/business";
import PaddingBox from "@/components/paper/box/padding";
import ButtonList from "@/components/button/list";
import Pagination from "@/components/inputs/pagination";
import axios from "axios";
import SmallLoader from "@/components/loader/small";
import FileContentBox from "@/components/paper/box/file-content";
import FileViewer from "@/components/paper/box/viewer";
import { Icon } from "@iconify/react";
import Modal from "@/components/modal";
import CenterBox from "@/components/paper/box/center";
import ScanLoader from "@/components/loader/scan";
import FileSearchLoader from "@/components/loader/file-search";
import { Metadata } from "next";
import Head from 'next/head';
import DropDown from "@/components/paper/dropdown";
import replaceRelativeImgPaths from '@/utills/replaceRelativeImgPaths';
import { fileTypes } from "@/static/file-types";
import { toLocalDate } from '@/utills/formatDate';

export const metadata: Metadata = {
    title: 'SEC Filings',
    description: '',
};

const API_ENDPOINT = "http://52.21.115.180:8000/";

const HomePage: NextPage = () => {
    const [filter, setFilter] = useState({
        select: "All",
        search: "",
    });
    const [pagination, setPagination] = useState({
        limit: 9,
        page: 0,
    });
    const [files, setFiles] = useState([]);
    const [fileItem, setFileItem] = useState<any>(undefined);
    const [selected, setSelected] = useState<any>(undefined);
    const [loading, setLoading] = useState(false);
    const [fileLoading, setFileLoading] = useState(false);
    const [scanning, setScanning] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openFileType, setOpenFileType] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [selectedFileType, setSelectedFileType] = useState(999);

    const searchHandle = async () => {
        setLoading(true);
        try {
            const { data } = await axios({
                method: "GET",
                url: `${API_ENDPOINT}recent_filings`,
                withCredentials: false,
                params: {
                    company: filter.search,
                    filing_type: filter.select
                }
            });
            setFiles(data.filings);
            if (data.filings.length > 0) {
                await selectHandle(data.filings?.[0] || undefined);
            } else {
                setFileItem(undefined);
            }
        } catch (e) {
            console.warn(e);
        }
        setLoading(false);
    };

    const selectHandle = async (fl: any) => {
        setFileLoading(true);
        setSelected(fl);
        try {
            const { data } = await axios({
                method: "GET",
                url: `${API_ENDPOINT}get_filing_html`,
                withCredentials: false,
                params: {
                    url: fl.url,
                }
            });
            setFileItem(replaceRelativeImgPaths(data, fl.url));
        } catch (e) {
            console.log(e);
        }

        setFileLoading(false);
    };

    const showHandle = async (type: string, option?: string) => {
        setScanning(true);
        try {
            const { data } = await axios({
                method: "GET",
                url: {
                    "summary": `${API_ENDPOINT}get_summary`,
                    "point": `${API_ENDPOINT}get_key_points`,
                    "flag": `${API_ENDPOINT}get_red_flags`,
                    "involved": `${API_ENDPOINT}get_who_is_involved`,
                    "impacted": `${API_ENDPOINT}get_who_is_impacted`,
                }[type],
                withCredentials: false,
                params: {
                    url: selected?.url || "",
                    k_type: option
                }
            });

            setModalContent(data);
            setOpenModal(true);
        } catch (e) {
            console.log(e);
        }
        setScanning(false);
    };

    return (
        <Container>
            <Head>
                <title>SmartFilings</title>
            </Head>
            <div style={{ marginTop: 20, marginLeft: 12 }}>
                <img src="/Logo.png" alt="logo" width="200" height="41" />
            </div>
            <GridBox>
                <div>
                    <PaddingBox style={{ marginBottom: 20 }}>
                        <div style={{ position: "relative" }}>
                            <p
                                style={{
                                    color: "#ffffff",
                                    fontSize: 24,
                                    position: "absolute",
                                    top: "-60px",
                                    right: "9px",
                                    fontWeight: 600
                                }}>
                                {selected?.company_name || ""}
                            </p>
                            <p
                                style={{
                                    color: "#a0a0a0",
                                    margin: 0,
                                    fontSize: 12,
                                    paddingLeft: 12
                                }}
                            >
                                Choose Type
                            </p>
                            <BusinessSelect
                                value={filter.select}
                                onChange={(e) => {
                                    setFilter({ ...filter, select: e.target.value });
                                }}
                            >
                                <option value="All">All</option>
                                {/* Other options */}
                            </BusinessSelect>
                            <a
                                onClick={() => {
                                    setOpenFileType(true);
                                }}
                                style={{
                                    display: "block",
                                    textAlign: "right",
                                    color: "#e0e0e0",
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                }}>
                                Browse Filing Types
                            </a>
                        </div>
                    </PaddingBox>
                    <PaddingBox>
                        <FlexBox>
                            <SearchInput
                                value={filter.search}
                                onChange={(e) => {
                                    setFilter({ ...filter, search: e.target.value });
                                }}
                                placeholder="Company Name Here..."
                            />
                            <FormButton
                                style={{ width: "100%" }}
                                disabled={!Boolean(filter.select) || !Boolean(filter.search)}
                                onClick={searchHandle}
                            >
                                Get Recent Filings
                            </FormButton>
                        </FlexBox>
                    </PaddingBox>
                    <FilterBox>
                        {loading ? (
                            <SmallLoader />
                        ) : (
                            files.length > 0 ? (
                                <div>
                                    <ButtonList>
                                        {files.slice(pagination.page * pagination.limit, pagination.page * pagination.limit + 10).map((file: any, index) => (
                                            <button
                                                onClick={() => {
                                                    selectHandle(file);
                                                }}
                                                key={`file-${index}`}
                                            >
                                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                                    <div>{file.filing_date}</div>
                                                </div>
                                                <div>
                                                    {file.form_type}
                                                </div>
                                                <a target="_blank" href={`${file.url}`}>source</a>
                                            </button>
                                        ))}
                                    </ButtonList>
                                </div>
                            ) : (
                                <div
                                    style={{
                                        minHeight: 530,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        color: "#e0e0e0"
                                    }}>
                                    <Icon
                                        style={{
                                            fontSize: 102,
                                            color: "#ffffff"
                                        }}
                                        icon="la:folder-solid"
                                    />
                                    <p>
                                        No List
                                    </p>
                                </div>
                            )
                        )}
                        <Pagination>
                            <button
                                disabled={pagination.page < 1}
                                onClick={() => {
                                    setPagination({
                                        ...pagination,
                                        page: pagination.page - 1
                                    });
                                }}
                            >
                                prev
                            </button>
                            <p>
                                Page {pagination.page + 1} / {Math.ceil(files.length / pagination.limit)}
                            </p>
                            <button
                                disabled={pagination.page + 1 >= Math.ceil(files.length / pagination.limit)}
                                onClick={() => {
                                    setPagination({ ...pagination, page: pagination.page + 1 });
                                }}>
                                next
                            </button>
                        </Pagination>
                    </FilterBox>
                </div>
                <div>
                    <FlexBox style={{ paddingLeft: 12, marginTop: 24, marginBottom: 24 }}>
                        <FormButton onClick={() => showHandle("summary")} disabled={!Boolean(fileItem)}>Summarize</FormButton>
                        <DropDown>
                            <FormButton disabled={!Boolean(fileItem)}>
                                Key Points
                            </FormButton>
                            <div className="dropdown-wrap">
                                <FormButton
                                    onClick={() => showHandle("point", "that are important to Investment Banks")}
                                    disabled={!Boolean(fileItem)}
                                >
                                    That are important to Investment Banks
                                </FormButton>
                                <FormButton
                                    onClick={() => showHandle("point", "that are important to Day Traders")}
                                    disabled={!Boolean(fileItem)}
                                >
                                    That are important to Day Traders
                                </FormButton>
                                <FormButton
                                    onClick={() => showHandle("point", "that are important to Competitors")}
                                    disabled={!Boolean(fileItem)}
                                >
                                    That are important to Competitors
                                </FormButton>
                                <FormButton
                                    onClick={() => showHandle("point", "that are important to Long Term Investors")}
                                    disabled={!Boolean(fileItem)}
                                >
                                    That are important to Long Term Investors
                                </FormButton>
                            </div>
                        </DropDown>
                        <FormButton onClick={() => showHandle("flag")} disabled={!Boolean(fileItem)}>Red Flags</FormButton>
                        <FormButton onClick={() => showHandle("involved")} disabled={!Boolean(fileItem)}>Contradiction Finder</FormButton>
                        <FormButton onClick={() => showHandle("impacted")} disabled={!Boolean(fileItem)}>Who is impacted</FormButton>
                    </FlexBox>
                    <FileContentBox>
                        {fileLoading ? (
                            <FileSearchLoader />
                        ) : !fileItem ? (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    flexDirection: "column",
                                }}>
                                <Icon
                                    style={{
                                        fontSize: 102
                                    }}
                                    icon="fluent:slide-text-20-regular"
                                />
                                <p style={{ margin: 0 }}>No Content</p>
                            </div>
                        ) : (
                            <>
                                {scanning && <ScanLoader />}
                                <div style={{ height: "100%", overflow: "auto" }}>
                                    <FileViewer dangerouslySetInnerHTML={{ __html: fileItem || "" }} />
                                </div>
                            </>
                        )}
                    </FileContentBox>
                </div>
            </GridBox>

            <Modal setOpen={setOpenModal} open={openModal}>
                {scanning ? (
                    <CenterBox>
                        <FileSearchLoader />
                    </CenterBox>
                ) : (
                    <div
                        style={{
                            color: "#ffffff",
                            padding: 32,
                            lineHeight: 2,
                            whiteSpace: "pre-wrap"
                        }}>
                        {modalContent}
                        <div style={{ marginTop: 35 }}>
                            <FormButton onClick={() => {
                                setOpenModal(false);
                            }}>Close</FormButton>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal setOpen={setOpenFileType} open={openFileType}>
                <div style={{ padding: 24 }}>
                    <BusinessSelect
                        onChange={(e) => {
                            setSelectedFileType(parseInt(e.target.value));
                        }}>
                        {
                            fileTypes.map((fileType, index) => (
                                <option value={fileType.id} key={index}>
                                    {fileType.val}
                                </option>
                            ))
                        }
                    </BusinessSelect>
                    <div style={{
                        display: "grid",
                        width: "100%",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        height: "300px",
                        overflowY: "auto",
                        marginTop: 24
                    }}>
                        {
                            fileTypes
                                .find((fileType, index) => (fileType.id === selectedFileType))?.data?.map((type) => (
                                    <label htmlFor={type} style={{ color: "#ffffff" }} key={type}>
                                        <input id={type} type="checkbox" />
                                        {type}
                                    </label>
                                ))
                        }
                    </div>
                </div>
            </Modal>
        </Container>
    );
};

export default HomePage;
