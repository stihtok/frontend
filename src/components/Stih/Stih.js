import { useState, useEffect } from 'react';
import Author from './Author/Author';
import Body from './Body/Body';
import Date from './Date/Date';
import Epigraph from './Epigraph/Epigraph';
import './Stih.css'
import Title from './Title/Title';
import { forwardRef } from 'react';
import Like from './Like/Like';

const Stih = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="stih">
        <Author id={props.stih.author.id} author={props.stih.author.name} authorImg={props.stih.author.photo}/>
        <Title id={props.stih.id} title={props.stih.title}/>
        <Epigraph epigraph={props.stih.epigraph}/>
        <Body body={props.stih.body}/>
        <Date date={props.stih.createdAt} />
        <Like id={props.stih.id}/>
    </div>
  );
}
)

export default Stih;
