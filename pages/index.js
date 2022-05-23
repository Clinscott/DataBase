import Head from "next/head";
import clientPromise from "../lib/mongodb";
import { useState, useEffect } from "react";
//import { createItem } from '../server/create';
import {ItemForm} from '../components/itemForm';

export default function Home({ items }) {
  const [itemDelete, setItemDelete] = useState(false);
  const [isLoading, setLoading] = useState();

  const handleDelete = async (props) => {
setItemDelete(true);
    console.log(props);
    const data = await fetch(`http://localhost:3000/api/delete`, {
      method: "DELETE",
      body: props,
    });
    setItemDelete(false);
    console.log(data);
  };

  return (
    <div className="container">
      <Head>
        <title>devinternchallenege2022</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Item Database</h1>

        <p className="description">Create, Read, Update and Delete.</p>

        <div className="container">
          <ItemForm />
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Description</th>
                <th>Location</th>
                <th></th>
              </tr>
            </thead>
            {items.map((items) => {
              return (
                <tbody key={items._id}>
                  <tr>
                    <td>{items.item}</td>
                    <td>{items.description}</td>
                    <td>{items.location}</td>
                    <td>
                      <button
                        onClick={() => {
                          handleDelete(items["_id"]);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        table {
          border: 2px solid forestgreen;
          width: 800px;
          height: 200px;
        }

        th {
          border-bottom: 1px solid black;
        }

        td {
          text-align: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .subtitle {
          font-size: 2rem;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps(context) {
  const client = await clientPromise;

  const db = client.db("inventoryDb");

  let items = await db.collection("inventory").find({}).toArray();
  items = JSON.parse(JSON.stringify(items));

  return {
    props: { items },
  };
}
