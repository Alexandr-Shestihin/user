import React from "react";
import styled from "styled-components";
import {ContentBox, TitleRow, TitleRowTitle, InnerBox} from "../../../components/UI";

const Tabs = styled.div`
        display: flex;
        align-items: center;
        
        @media (max-width: 767px) {
            margin: 6px 0;
        }
        
        div {
            cursor: pointer;
            transition: all .3s ease;
            font-weight: 500;
            font-size: 14px;
            
            &:hover {
                color: #EDA211;
            }
        }
        
        div.active {
            color: #EDA211;
        }
        
        div + div {
            margin-left: 30px;
        }
    `,
    StyledTitleRow = styled(TitleRow)`
        margin: 0 0 10px;
        
        @media (max-width: 767px) {
            flex-direction: column;
        }
    `,
    Table = styled(InnerBox)`
        padding-bottom: 0;
        
        h2 {
            font-weight: bold;
            font-size: 21px;
            color: #D5CBFF;
            margin: 0 0 16px;
        }
        
        .table-holder {
            margin: 0 -20px;
            overflow-x: scroll;
        }
        
        .red {
            color: #EB5757;
        }
        
        .green {
            color: #14C911;
        }
        
        .name {
            max-width: 230px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
        }
        
        thead {
            th {
                font-weight: 500;
                font-size: 16px;
                color: #D5CBFF;
                padding: 8px 10px;
            
                &:first-child {
                    width: 100%;
                    text-align: left;
                    padding-left: 20px;
                }
                
                &:last-child {
                    padding-right: 20px;
                }
            }
        }
        
        tbody {
        
            td {
                font-weight: 500;
                font-size: 14px;
                padding: 10px;
                white-space: nowrap;
                text-align: center;
                
                &:first-child {
                    text-align: left;
                    padding-left: 20px;
                }
                
                &:last-child {
                    padding-right: 20px;
                }
            }
            
            td {
                border-top: 1px solid #201941;
            }
            
            .win {
                td {
                    background: rgba(63, 49, 124, .5);
                }
            }
        }
    `;

export default function Tournaments() {
    return (
        <ContentBox>
            <StyledTitleRow>
                <TitleRowTitle>Tournament results</TitleRowTitle>
                <Tabs>
                    <div className="active">Last 24h</div>
                    <div>Last week</div>
                    <div>All time</div>
                </Tabs>
            </StyledTitleRow>
            <Table>
                <h2>Recent performance</h2>
                <div className="table-holder">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Result</th>
                                <th>Score</th>
                                <th>Kills</th>
                                <th>Deaths</th>
                                <th>KDR</th>
                                <th>FPR</th>
                                <th>ADR</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="win">
                                <td>
                                    <div className="name">
                                        EU 1v1 1nDone Gunfight 01-01
                                    </div>
                                </td>
                                <td>4 Feb</td>
                                <td className="green">Victory</td>
                                <td>16 : 10</td>
                                <td className="green">41</td>
                                <td className="red">41</td>
                                <td>1.3</td>
                                <td>1.6</td>
                                <td>302</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="name">
                                        StarCraft 2 | Ender's Game Tour StarCraft 2 | Ender's Game Tour
                                    </div>
                                </td>
                                <td>28 Jan</td>
                                <td className="red">Defeat</td>
                                <td>16 : 10</td>
                                <td className="green">41</td>
                                <td className="red">41</td>
                                <td>0.8</td>
                                <td>1.6</td>
                                <td>302</td>
                            </tr>
                            <tr className="win">
                                <td>
                                    <div className="name">
                                        EU 1v1 1nDone Gunfight 01-01
                                    </div>
                                </td>
                                <td>4 Feb</td>
                                <td className="green">Victory</td>
                                <td>16 : 10</td>
                                <td className="green">41</td>
                                <td className="red">41</td>
                                <td>1.3</td>
                                <td>1.6</td>
                                <td>302</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="name">
                                        StarCraft 2 | Ender's Game Tour StarCraft 2 | Ender's Game Tour
                                    </div>
                                </td>
                                <td>28 Jan</td>
                                <td className="red">Defeat</td>
                                <td>16 : 10</td>
                                <td className="green">41</td>
                                <td className="red">41</td>
                                <td>0.8</td>
                                <td>1.6</td>
                                <td>302</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="name">
                                        StarCraft 2 | Ender's Game Tour StarCraft 2 | Ender's Game Tour
                                    </div>
                                </td>
                                <td>28 Jan</td>
                                <td className="red">Defeat</td>
                                <td>16 : 10</td>
                                <td className="green">41</td>
                                <td className="red">41</td>
                                <td>0.8</td>
                                <td>1.6</td>
                                <td>302</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Table>
        </ContentBox>
    )
}