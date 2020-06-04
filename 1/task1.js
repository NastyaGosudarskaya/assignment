const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    password: '1237531',
    host: 'localhost',
    port: 5433,
    database: 'books'
})

execute()

async function execute(){
    try{
        await client.connect()
        console.log("Connected successfully")
        await client.query('BEGIN')
        await client.query(update_if(2, 'books for children'))
        await client.query('COMMIT')

        const {rows} = await client.query(find_by_name('books for teenagers'))
        console.table(rows)
    }
    catch{
        await client.query('ROLLBACK')
    }
    finally{
        await client.end()
        console.log("Cleaned")
    }
}

function update_if (id, txt){
    if (id == 1)
        return `update books set name = '${txt}' where id = ${id}`;
    else
        return `update books set name = '${txt+2}' where id = ${id}`;
}

function find_by_name(name){
    return(`
    WITH RECURSIVE write_down_children_books(id, name, parent_id, level) AS (
    SELECT id, name, parent_id, 1 FROM books WHERE name='${name}'
    UNION ALL 
    SELECT b.id, b.name, b.parent_id, level+1
    FROM books b, write_down_children_books wdcb
    WHERE b.parent_id = wdcb.id)
    SELECT id, name, parent_id, level FROM write_down_children_books order by id;` //обход дерева и вывод узла "books for children" и его потомков
    );
}
