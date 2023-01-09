import React, {useState, useEffect, FunctionComponent} from 'react'
import classNames from "classnames";
import {Styled} from './style'
import {FormattedMessage} from "react-intl";

const arrowIcon = () => (
    <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.112875 4.104V2.84H7.98488V0.856L12.4809 3.464L7.98488 6.088V4.104H0.112875Z"/>
    </svg>
);

interface ITableModel {
    key: string;
    value: string;
    align?: 'left' | 'center' | 'right';
    sortable?: boolean;
    valueModifier?: string;
}

interface ITableData {
    [key: string]: string | number;
}

interface IProps {
    tableModel: ITableModel[];
    tableData: ITableData[];
    variant?: 'dotaHeroes' | 'topFive';
    ranked?: boolean;
    clickable?: boolean;
}

const Table: FunctionComponent<IProps> = ({
    tableModel = [],
    tableData = [],
    variant = '',
    ranked  = false,
    clickable = false
}) => {
    const [sortBy, setSortBy] = useState('')

    useEffect(() => {

        // set initial sorting
        setSortBy(tableModel.find(item => item.sortable)?.key || '')

    }, [tableModel])

    // sort
    const sorted = tableData.sort((a,b) => Number(a[sortBy]) - Number(b[sortBy])).reverse();

    return (
        <Styled.TableHolder>
            <Styled.Table className={variant}>
                <thead>
                    <tr>
                        {ranked && <FormattedMessage id="cityBattle.leaderboard.table.rank" tagName="th"/>}
                        {tableModel.map(th => {
                            return (
                                <th
                                    className={classNames({
                                        'skip-this': !th.sortable,
                                        'sortable': th.sortable,
                                        'sort-this': th.key === sortBy,
                                        'align-center': th.align === 'center',
                                        'align-right': th.align === 'right'
                                    })}
                                    onClick={() => setSortBy(th.key)}
                                    key={th.key}>
                                    {th.value}
                                    {th.key === sortBy && arrowIcon()}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {sorted.map((tr, trIndex) => {
                        const entries = Object.entries(tr)

                        let clickHandler = () => void(0)

                        if (clickable && (typeof tr.onRowClick === 'function')) {
                            clickHandler = tr.onRowClick
                        }

                        return (
                            <tr key={trIndex}
                                className={clickable ? 'clickable' : ''}
                                onClick={clickHandler}>
                                {ranked && <td>{trIndex + 1}</td>}
                                {entries.map((item, tdIndex) => {
                                    const [key, value] = item;

                                    if (key === 'onRowClick') {
                                        return false
                                    }

                                    return (
                                        <td
                                            className={tableModel[tdIndex].sortable ? 'sortable' : ''}
                                            key={key}>
                                            {value}{tableModel[tdIndex].valueModifier}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </Styled.Table>
        </Styled.TableHolder>
    )
}

export default Table