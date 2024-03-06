import { useParams } from 'react-router-dom';
import { useStoreEffect, useStoreState } from '../../../../../react-vault';
import { Transaction } from './Transaction/Transaction.tsx';
import cn from './Sidebar.module.css';
import { AddTransaction } from '../general/AddTransaction/AddTransaction.tsx';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export const Sidebar = () => {
  const transactions: any = useStoreState((store: any) => store.transactions);
  const onReorderTransactions = useStoreEffect(
    (store: any) => store.transactions.onReorderTransactions,
  );
  const params = useParams();

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const currentOrder = result.source.index;
    const newOrder = result.destination.index;

    onReorderTransactions({ currentOrder, newOrder });
  };

  return (
    <div className={cn.container}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="transactions">
          {(provided: any) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className={cn.wrapper}>
              {transactions.list.map((id: any, index: number) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided: any) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Transaction
                        key={id}
                        transaction={transactions.map[id]}
                        isActive={id === params?.transactionId}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <AddTransaction styles={cn.modalContainer} />
    </div>
  );
};